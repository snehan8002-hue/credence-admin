import { createClient } from 'npm:@supabase/supabase-js@2'
import { importX509, jwtVerify } from 'npm:jose@6'

const FIREBASE_PROJECT_ID = 'credence-76953'
const ADMIN_UID = 'aBYdbFwbsTUbpmYtoNurxyu3Roj2'
const BUCKET = 'credence-files'
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

let cachedCerts: Record<string, string> = {}
let certExpiry = 0

async function getCerts() {
  if (Date.now() < certExpiry && Object.keys(cachedCerts).length) return cachedCerts
  const res = await fetch(GOOGLE_CERTS_URL)
  if (!res.ok) throw new Error('Unable to load Firebase signing certificates')
  cachedCerts = await res.json()
  const cache = res.headers.get('cache-control') || ''
  const match = cache.match(/max-age=(\d+)/)
  certExpiry = Date.now() + (match ? Number(match[1]) * 1000 : 3600000)
  return cachedCerts
}

async function verifyFirebaseToken(token: string) {
  const certs = await getCerts()
  const header = JSON.parse(atob(token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/')))
  const cert = certs[header.kid]
  if (!cert) throw new Error('Unknown Firebase signing key')
  const key = await importX509(cert, 'RS256')
  const { payload } = await jwtVerify(token, key, {
    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
    audience: FIREBASE_PROJECT_ID,
  })
  if (payload.sub !== ADMIN_UID) throw new Error('Unauthorized CREDENCE admin')
  return payload
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

async function adminClient() {
  const keys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}')
  const secret = keys.default
  if (!secret) throw new Error('Supabase secret key is unavailable to the function')
  return createClient(Deno.env.get('SUPABASE_URL')!, secret)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const auth = req.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer ')) return json({ error: 'Missing Firebase authorization token' }, 401)
    await verifyFirebaseToken(auth.slice(7))

    const supabase = await adminClient()
    const form = await req.formData()
    const action = String(form.get('action') || 'upload')

    if (action === 'upload') {
      const file = form.get('file')
      if (!(file instanceof File)) return json({ error: 'No file supplied' }, 400)
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        return json({ error: 'Only PDF files are allowed' }, 400)
      }
      if (file.size > 50 * 1024 * 1024) return json({ error: 'PDF must be 50 MB or smaller' }, 400)
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const path = `notes/${crypto.randomUUID()}-${safeName}`
      const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false,
      })
      if (error) throw error
      return json({ success: true, bucket: BUCKET, path: data.path, fileName: file.name, size: file.size, contentType: 'application/pdf' })
    }

    if (action === 'list') {
      const { data, error } = await supabase.storage.from(BUCKET).list('notes', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
      if (error) throw error
      return json({ success: true, files: data || [] })
    }

    if (action === 'signed') {
      const path = String(form.get('path') || '')
      if (!path.startsWith('notes/')) return json({ error: 'Invalid path' }, 400)
      const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 600)
      if (error) throw error
      return json({ success: true, url: data.signedUrl })
    }

    if (action === 'delete') {
      const path = String(form.get('path') || '')
      if (!path.startsWith('notes/')) return json({ error: 'Invalid path' }, 400)
      const { error } = await supabase.storage.from(BUCKET).remove([path])
      if (error) throw error
      return json({ success: true })
    }

    return json({ error: 'Unknown action' }, 400)
  } catch (error) {
    console.error(error)
    return json({ error: error instanceof Error ? error.message : 'Storage operation failed' }, 500)
  }
})
