(() => {
  const state = { enrollments: [], currentCourse: null, sections: [], lectures: [], currentLectureIndex: -1 };
  const $ = (id) => document.getElementById(id);
  const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  async function rest(path, options = {}) {
    const token = localStorage.getItem('credence_access_token');
    const headers = { apikey: window.CREDENCE_CONFIG?.key || '', Authorization: `Bearer ${token || window.CREDENCE_CONFIG?.key || ''}`, ...(options.headers || {}) };
    const r = await fetch(`${window.CREDENCE_CONFIG?.url || ''}/rest/v1/${path}`, { ...options, headers });
    const text = await r.text();
    if (!r.ok) throw new Error(text || `Request failed (${r.status})`);
    return text ? JSON.parse(text) : null;
  }
  function session() { return !!localStorage.getItem('credence_access_token'); }
  function toast(msg) { if (window.showToast) window.showToast(msg); else alert(msg); }

  async function loadMyLearning() {
    const box = $('myLearningGrid');
    if (!box) return;
    if (!session()) { box.innerHTML = '<div class="empty-state">Log in to see your enrolled courses.</div>'; return; }
    box.innerHTML = '<div class="loading-state">Loading your learning...</div>';
    try {
      const rows = await rest('enrollments?select=id,course_id,created_at,courses(id,title,description,thumbnail_path,price_inr)&order=created_at.desc');
      state.enrollments = rows || [];
      if (!state.enrollments.length) { box.innerHTML = '<div class="empty-state">No courses yet. Explore the catalog and enroll in a course.</div>'; return; }
      const cards = [];
      for (const e of state.enrollments) {
        const course = e.courses || {};
        const progress = await getCourseProgress(e.course_id);
        const last = await getLastLecture(e.course_id);
        cards.push(`<article class="course-card learning-card"><div class="course-thumb">${course.thumbnail_path ? `<img src="${esc(course.thumbnail_path)}" alt="">` : '<span>CREDENCE</span>'}</div><div class="course-body"><h3>${esc(course.title || 'Course')}</h3><p>${esc(course.description || 'Continue your learning journey.')}</p><div class="progress-wrap"><div class="progress-label"><span>${progress}% complete</span><span>${last ? 'Resume available' : 'Start learning'}</span></div><div class="progress-track"><i style="width:${progress}%"></i></div></div><button class="primary-btn" data-open-course="${esc(e.course_id)}">${last ? 'Continue learning' : 'Start course'}</button></div></article>`);
      }
      box.innerHTML = cards.join('');
      box.querySelectorAll('[data-open-course]').forEach(b => b.addEventListener('click', () => openCourse(b.dataset.openCourse)));
    } catch (e) { console.error(e); box.innerHTML = '<div class="error-state">Could not load My Learning. Please try again.</div>'; }
  }

  async function getCourseProgress(courseId) {
    const rows = await rest(`course_progress?course_id=eq.${encodeURIComponent(courseId)}&select=progress_percent,last_lecture_id`);
    return Math.max(0, Math.min(100, Math.round(Number(rows?.[0]?.progress_percent || 0))));
  }
  async function getLastLecture(courseId) {
    const rows = await rest(`course_progress?course_id=eq.${encodeURIComponent(courseId)}&select=last_lecture_id,updated_at`);
    return rows?.[0]?.last_lecture_id || null;
  }

  async function openCourse(courseId) {
    const modal = $('learningModal');
    if (!modal) return;
    modal.classList.add('open');
    $('learningContent').innerHTML = '<div class="loading-state">Loading course...</div>';
    try {
      const courses = await rest(`courses?id=eq.${encodeURIComponent(courseId)}&select=id,title,description,thumbnail_path`);
      state.currentCourse = courses?.[0];
      if (!state.currentCourse) throw new Error('Course not found');
      state.sections = await rest(`course_sections?course_id=eq.${encodeURIComponent(courseId)}&select=id,title,description,position&order=position.asc`);
      state.lectures = await rest(`lectures?course_id=eq.${encodeURIComponent(courseId)}&select=id,section_id,title,description,position,lecture_type,duration_seconds,is_preview,video_path&order=position.asc`);
      renderPlayer();
    } catch (e) { console.error(e); $('learningContent').innerHTML = '<div class="error-state">This course could not be opened. You may not have access to its paid lessons yet.</div>'; }
  }

  function renderPlayer() {
    const c = state.currentCourse;
    const groups = (state.sections || []).map(s => {
      const ls = state.lectures.filter(l => l.section_id === s.id);
      return `<div class="lesson-section"><h4>${esc(s.title)}</h4>${ls.map(l => `<button class="lesson-row" data-lecture="${esc(l.id)}"><span>${esc(l.title)}</span><small>${esc(l.lecture_type || 'video')}</small></button>`).join('') || '<p class="muted">No lectures in this section.</p>'}</div>`;
    }).join('');
    $('learningContent').innerHTML = `<div class="player-layout"><div class="player-main"><div id="mediaStage" class="media-stage"><div class="media-placeholder">Select a lesson to begin</div></div><div id="lectureMeta" class="lecture-meta"><h2>${esc(c.title)}</h2><p>${esc(c.description || '')}</p></div><div class="player-actions"><button id="prevLecture" class="secondary-btn">Previous</button><button id="completeLecture" class="primary-btn">Mark complete</button><button id="nextLecture" class="secondary-btn">Next</button></div></div><aside class="lesson-sidebar"><h3>Course content</h3>${groups}</aside></div>`;
    $('learningContent').querySelectorAll('[data-lecture]').forEach(b => b.addEventListener('click', () => selectLecture(b.dataset.lecture)));
    $('prevLecture').addEventListener('click', () => moveLecture(-1));
    $('nextLecture').addEventListener('click', () => moveLecture(1));
    $('completeLecture').addEventListener('click', () => markComplete());
    const last = null;
    if (state.lectures.length) selectLecture(last || state.lectures[0].id);
  }

  async function selectLecture(id) {
    const i = state.lectures.findIndex(l => l.id === id); if (i < 0) return;
    state.currentLectureIndex = i; const l = state.lectures[i];
    const stage = $('mediaStage');
    if (l.lecture_type === 'pdf' || l.lecture_type === 'document') stage.innerHTML = '<div class="media-placeholder">📄 PDF/material selected.<br><small>Secure signed-file access will be enabled through the protected Storage endpoint.</small></div>';
    else stage.innerHTML = '<div class="media-placeholder">▶️ Video lesson selected.<br><small>Secure signed-video access will be enabled through the protected Storage endpoint.</small></div>';
    $('lectureMeta').innerHTML = `<h2>${esc(l.title)}</h2><p>${esc(l.description || '')}</p><small>${Math.round((l.duration_seconds || 0)/60)} min · ${esc(l.lecture_type || 'video')}</small>`;
    await recordProgress(l, false);
    $('learningContent').querySelectorAll('.lesson-row').forEach(b => b.classList.toggle('active', b.dataset.lecture === id));
  }
  function moveLecture(delta) { const n = state.currentLectureIndex + delta; if (n >= 0 && n < state.lectures.length) selectLecture(state.lectures[n].id); }
  async function recordProgress(l, completed) {
    try {
      const body = { lecture_id: l.id, progress_percent: completed ? 100 : 0, completed, last_position_seconds: 0, updated_at: new Date().toISOString() };
      await rest('lecture_progress', { method: 'POST', headers: { 'Content-Type':'application/json', Prefer:'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(body) });
    } catch (e) { console.warn('progress write', e); }
  }
  async function markComplete() {
    const l = state.lectures[state.currentLectureIndex]; if (!l) return;
    await recordProgress(l, true);
    try {
      const total = state.lectures.length;
      const doneRows = await rest(`lecture_progress?select=lecture_id&completed=eq.true&lecture_id=in.(${state.lectures.map(x=>x.id).join(',')})`);
      const percent = total ? Math.round(((doneRows || []).length / total) * 100) : 0;
      await rest('course_progress', { method:'POST', headers:{'Content-Type':'application/json', Prefer:'resolution=merge-duplicates,return=minimal'}, body:JSON.stringify({ course_id: state.currentCourse.id, progress_percent: percent, last_lecture_id:l.id, updated_at:new Date().toISOString() }) });
      toast(percent === 100 ? 'Course completed! 🎉' : 'Lesson marked complete.');
    } catch (e) { console.warn(e); toast('Lesson completed, but course progress could not be refreshed yet.'); }
  }

  window.CREDENCE_LEARNING = { loadMyLearning, openCourse };
  document.addEventListener('DOMContentLoaded', () => {
    const close = $('closeLearningModal'); if (close) close.addEventListener('click', () => $('learningModal').classList.remove('open'));
    const my = $('myLearningGrid'); if (my) loadMyLearning();
  });
})();
