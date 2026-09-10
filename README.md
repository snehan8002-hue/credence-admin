# CREDENCE

Modern educational and course-selling platform rebuilt around Supabase.

## Product
Student + Master/Admin role routing; email/password and Email/Phone OTP auth; profile/avatar; responsive dashboard; notes with private PDF viewer/download; timed tests/quizzes with persistent attempts and instant score; realtime WhatsApp-style chat with media; live video player and recordings; attendance; free/paid content; UPI intent checkout with order tracking; banners; app settings/customisation; Realtime notifications.

## Backend
`schema.sql` is the canonical data model. The connected Supabase project has the tables, RLS, private Storage buckets and Realtime publication provisioned. `supabase/functions/credence-admin/index.ts` is the privileged Master/Admin account-management function.

## Important deployment notes
Phone OTP requires an SMS provider configured in Supabase Auth. UPI checkout uses a standard UPI intent and stores a pending order; a production verified-payment flow should be connected to a payment gateway/webhook before auto-granting paid access. Live broadcasting needs an HLS/RTMP provider; the app is the player/control surface.
