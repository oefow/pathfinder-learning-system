import { auth, db } from "./firebase-config.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { CLASSES } from "./data.js";

const $ = (id) => document.getElementById(id);
const view = $("view");
const themeKey = "pf:theme";
const applyTheme = (mode) => { document.documentElement.dataset.theme = mode; try { localStorage.setItem(themeKey, mode); } catch {} };
applyTheme(localStorage.getItem(themeKey) === "dark" ? "dark" : "light");
let user = null;
const motionOkay = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function toastAchievement(items) {
  if (!items.length) return;
  const host = document.getElementById('achievementToasts');
  if (!host) return;
  items.slice(0, 3).forEach((badge, i) => {
    const el = document.createElement('div');
    el.className = 'achievement-toast'; el.setAttribute('role', 'status');
    el.innerHTML = `<span class="toast-medal" aria-hidden="true">${badge.icon}</span><div><small>ACHIEVEMENT UNLOCKED</small><strong>${esc(badge.title)}</strong><span>${esc(badge.desc)}</span></div><button type="button" aria-label="Dismiss notification">×</button>`;
    el.querySelector('button').addEventListener('click', () => el.remove());
    host.append(el);
    setTimeout(() => el.remove(), 6000 + i * 500);
  });
}


/* ---------- Local-first progress, synchronized to Firestore ---------- */
const key = () => `pf:${user.uid}`;
const emptyProgress = () => ({ done: {}, scores: {}, history: [], current: "friend" });
const P = () => { try { return { ...emptyProgress(), ...JSON.parse(localStorage.getItem(key())) }; } catch { return emptyProgress(); } };
let cloudReady = false, syncPending = false, syncBusy = false;
const saveLocal = (p) => { try { localStorage.setItem(key(), JSON.stringify(p)); } catch {} };
const save = (p) => {
  const before = user ? earnedBadges(P()) : [];
  const oldIds = new Set(before.map(b => b.title));
  saveLocal(p); syncPending = true;
  if (cloudReady) void syncProgress();
  const unlocked = earnedBadges(p).filter(b => !oldIds.has(b.title));
  if (unlocked.length) toastAchievement(unlocked);
};
function mergeProgress(local, remote) {
  const out = { ...emptyProgress(), ...remote, ...local, done: {}, scores: {}, history: [] };
  for (const cid of new Set([...Object.keys(remote.done || {}), ...Object.keys(local.done || {})]))
    out.done[cid] = [...new Set([...(remote.done?.[cid] || []), ...(local.done?.[cid] || [])])];
  for (const k of new Set([...Object.keys(remote.scores || {}), ...Object.keys(local.scores || {})]))
    out.scores[k] = Math.max(remote.scores?.[k] || 0, local.scores?.[k] || 0);
  const attempts = new Map();
  for (const attempt of [...(remote.history || []), ...(local.history || [])])
    if(attempt?.id) attempts.set(attempt.id, attempt);
  out.history = [...attempts.values()].sort((a,b) => (b.date || "").localeCompare(a.date || "")).slice(0, 300);
  return out;
}
async function loadCloudProgress() {
  try {
    const snap = await getDoc(doc(db, "progress", user.uid));
    const merged = mergeProgress(P(), snap.exists() ? snap.data() : {});
    saveLocal(merged);
    syncPending = true;
  } catch (err) { console.warn("Progress sync unavailable; using saved local progress", err); }
  cloudReady = true;
  void syncProgress();
  if (!isQuizActive()) route();
}
async function syncProgress() {
  if (!cloudReady || !user || syncBusy || !syncPending) return;
  syncBusy = true; syncPending = false;
  try {
    // Re-read remote to merge changes made on other devices before writing.
    const ref = doc(db, "progress", user.uid);
    const remote = await getDoc(ref);
    const merged = mergeProgress(P(), remote.exists() ? remote.data() : {});
    await setDoc(ref, merged);
    // Keep any local changes made during the network request.
    saveLocal(mergeProgress(P(), merged));
  } catch (err) { syncPending = true; console.warn("Firestore sync will retry", err); }
  finally { syncBusy = false; if(syncPending) setTimeout(() => { if(navigator.onLine) void syncProgress(); }, 3000); }
}
window.addEventListener("online", () => { if(cloudReady) void syncProgress(); });
const cls = (id) => CLASSES.find((c) => c.id === id) || CLASSES[0];
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
// Cryptographically seeded Fisher-Yates shuffle: new order for every attempt.
const randomIndex = (n) => {
  if (globalThis.crypto?.getRandomValues) {
    const max = Math.floor(4294967296 / n) * n;
    const v = new Uint32Array(1);
    do { crypto.getRandomValues(v); } while (v[0] >= max);
    return v[0] % n;
  }
  return Math.floor(Math.random() * n);
};
const shuffle = (a) => { const out = [...a]; for(let i=out.length-1;i>0;i--){const j=randomIndex(i+1);[out[i],out[j]]=[out[j],out[i]];} return out; };
const doneN = (p, c) => (p.done[c.id] || []).length;
const pctOf = (p, c) => Math.round((doneN(p, c) / c.topics.length) * 100);
const setCurrent = (id) => { const p = P(); if (p.current !== id) { p.current = id; save(p); } };

/* ---------- Small UI helpers ---------- */
const ring = (pct, size = 64, col = "#FFC20E", track = "rgba(255,255,255,.25)", txt = "#fff") => {
  const r = size / 2 - 6, c = +(2 * Math.PI * r).toFixed(1), m = size / 2;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${m}" cy="${m}" r="${r}" fill="none" stroke="${track}" stroke-width="6"/>
    <circle class="arc" cx="${m}" cy="${m}" r="${r}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${(c * (1 - pct / 100)).toFixed(1)}" style="--full:${c}" transform="rotate(-90 ${m} ${m})"/>
    <text x="${m}" y="${m}" text-anchor="middle" dominant-baseline="central" fill="${txt}" font-size="${size / 4.2}">${pct}%</text></svg>`;
};
const I = {
  book: '<path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 9h8M8 13h6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  home: '<path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z"/>',
  classes: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  left: '<path d="m15 6-6 6 6 6"/>',
};
const svg = (n) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
const banner = (c, title, sub, extra = "") => `<div class="banner" style="--c:${c.color}" data-i="${c.name[0]}"><h1>${title}</h1><p>${sub}</p>${extra}</div>`;
const chips = (cid, page) => `<div class="chips">${CLASSES.map((c) =>
  `<a class="chip ${c.id === cid ? "on" : ""}" style="--c:${c.color}" href="#/${page}/${c.id}">${c.name}</a>`).join("")}</div>`;

/* ---------- Menu + sidebar toggle ---------- */
const MENU = [["home", "Home"], ["classes", "Classes"], ["reviewer", "Reviewer"], ["quizzes", "Quizzes"], ["profile", "Profile"]];
const MI = { home: I.home, classes: I.classes, reviewer: I.book, quizzes: I.check, profile: I.profile };
$("sideNav").innerHTML = $("bottomNav").innerHTML = MENU.map(([k, l]) =>
  `<a href="#/${k}" data-k="${k}"><svg viewBox="0 0 24 24">${MI[k]}</svg><span>${l}</span></a>`).join("");

const setCollapsed = (v) => { document.body.classList.toggle("collapsed", v); try { localStorage.setItem("pf:collapsed", v ? "1" : "0"); } catch {} };
try { setCollapsed(localStorage.getItem("pf:collapsed") === "1"); } catch {}
const toggle = () => setCollapsed(!document.body.classList.contains("collapsed"));
$("collapse").onclick = toggle; $("burger").onclick = toggle;

/* ---------- Router ---------- */
const pages = { home, classes, reviewer, quizzes, profile };
function route() {
  const [page = "home", a, b] = location.hash.replace(/^#\/?/, "").split("/");
  const name = pages[page] ? page : "home";
  document.querySelectorAll(".menu a").forEach((el) => el.classList.toggle("on", el.dataset.k === name));
  $("topTitle").textContent = MENU.find((m) => m[0] === name)[1];
  pages[name](a, b);
  // Animate only page transitions, never quiz redraws (timer stays uninterrupted).
  if (!isQuizActive() && motionOkay()) {
    view.classList.remove('page-enter');
    void view.offsetWidth;
    view.classList.add('page-enter');
  }
  window.scrollTo(0, 0);
}

/* ---------- Home ---------- */
function home() {
  const p = P(), c = cls(p.current);
  const total = CLASSES.reduce((n, x) => n + x.topics.length, 0);
  const done = CLASSES.reduce((n, x) => n + doneN(p, x), 0);
  const sc = Object.values(p.scores);
  const avg = sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : 0;
  const first = esc((user.displayName || user.email).split(" ")[0]);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const nextT = c.topics.find((t) => !(p.done[c.id] || []).includes(t.id));
  const progress = total ? Math.round(done / total * 100) : 0;
  view.innerHTML = `
  <section class="welcome-panel">
    <div class="welcome-copy"><span class="eyebrow">✦ YOUR PATHFINDER JOURNEY</span>
      <h1>${greeting}, ${first}<span class="wave"> ✨</span></h1>
      <p>Every step you take is progress. Keep learning, growing, and serving with purpose.</p>
      <div class="welcome-actions"><a class="btn btn-yellow small" href="#/quizzes/${c.id}">Practice a quiz →</a><a class="btn btn-ghost small" href="#/reviewer/${c.id}">Explore reviewer</a></div>
    </div>
    <div class="welcome-progress">${ring(progress, 116)}<small>Overall learning progress</small></div>
  </section>
  <div class="stats home-stats">
    <div class="stat"><i>${svg("book")}</i><div><b>${done}/${total}</b><span>Topics completed</span></div></div>
    <div class="stat"><i>${svg("check")}</i><div><b>${sc.length}</b><span>Quizzes completed</span></div></div>
    <div class="stat"><i>${svg("star")}</i><div><b>${avg}%</b><span>Average best score</span></div></div>
  </div>
  <div class="home-section-title"><div><h2 class="sec">Your learning journey</h2><p class="sub">Six Pathfinder classes · progress at a glance</p></div></div>
  <div class="journey-grid">${CLASSES.map((x, i) => `
    <div class="journey-card" style="--c:${x.color};--delay:${i * 65}ms" aria-label="${x.name}: ${pctOf(p,x)} percent complete">
      <div class="journey-top"><span class="journey-symbol">${x.name[0]}</span><span class="journey-number">0${i+1}</span></div>
      <h3>${x.name}</h3><p>${doneN(p,x)} of ${x.topics.length} topics completed</p>
      <div class="journey-meter"><span style="width:${pctOf(p,x)}%"></span></div><strong>${pctOf(p,x)}% complete</strong>
    </div>`).join("")}</div>
  <section class="home-focus" aria-label="Recommended learning activity">
    <div class="focus-icon" aria-hidden="true">✦</div><div><span class="eyebrow">PICK UP WHERE YOU LEFT OFF</span>
    <h2>${nextT ? esc(nextT.title) : `Keep growing, ${esc(c.name)} Pathfinder`}</h2>
    <p>${nextT ? `Continue a topic in the ${esc(c.name)} reviewer.` : 'All topics in this class are completed. Try a quiz to check your knowledge.'}</p></div>
    <a class="btn btn-red small" href="#/${nextT ? `reviewer/${c.id}/${nextT.id}` : `quizzes/${c.id}`}">${nextT ? 'Read lesson' : 'Try a quiz'} →</a>
  </section>
  <div class="home-section-title"><div><h2 class="sec">Latest achievements</h2><p class="sub">Milestones worth celebrating</p></div><a class="text-link" href="#/profile">View profile →</a></div>
  ${badgesMarkup(p)}
  <div class="motto"><svg viewBox="0 0 24 24"><path d="M12 2 22 20H2z" fill="#B3121F"/><circle cx="12" cy="14" r="3" fill="#FFC20E"/></svg><p>The love of Christ compels us.<small>Pathfinder motto</small></p></div>`;
}

/* ---------- Classes ---------- */
function classes() {
  const p = P();
  view.innerHTML = `<h1 class="ph">Classes</h1><p class="sub">Open any class you want to study.</p>
  <div class="cls">${CLASSES.map((c) => `
    <a class="cc" style="--c:${c.color}" href="#/reviewer/${c.id}">
      <div class="badge">${c.name[0]}</div>
      <div><h3>${c.name}</h3>
        <div class="tags"><span class="tag">Usually age ${c.age}</span><span class="tag">Grade ${c.grade}</span></div>
        <div class="meter"><i style="width:${pctOf(p, c)}%"></i></div></div>
      <div class="go"><span>${c.topics.length} topics · ${c.quizzes.length} quizzes</span><b>${doneN(p, c) ? "Continue" : "Start"}</b></div>
    </a>`).join("")}</div>`;
}

/* ---------- Reviewer ---------- */
function reviewer(cid, tid) {
  const c = cls(cid || P().current); setCurrent(c.id);
  const p = P(), d = p.done[c.id] || [];
  if (tid) {
    const i = c.topics.findIndex((t) => t.id === tid), t = c.topics[i];
    if (!t) return (location.hash = `#/reviewer/${c.id}`);
    const isDone = d.includes(t.id), prev = c.topics[i - 1], next = c.topics[i + 1];
    view.innerHTML = `<a class="back" href="#/reviewer/${c.id}">${svg("left")} ${c.name} topics</a>
      <div class="qbar"><i style="width:${((i + 1) / c.topics.length) * 100}%"></i></div>
      <article class="read"><h1>${esc(t.title)}</h1>
        <div class="kicker">${c.name} class · Topic ${i + 1} of ${c.topics.length}</div>
        ${t.body.map((x) => `<p>${esc(x)}</p>`).join("")}</article>
      <div class="actions">
        <button class="btn ${isDone ? "btn-line" : "btn-red"} small" data-a="toggle" data-c="${c.id}" data-t="${t.id}">${isDone ? "Mark as not done" : "Mark as done"}</button>
        ${prev ? `<a class="btn btn-line small" href="#/reviewer/${c.id}/${prev.id}">Previous</a>` : ""}
        ${next ? `<a class="btn btn-line small" href="#/reviewer/${c.id}/${next.id}">Next topic</a>` : `<a class="btn btn-line small" href="#/quizzes/${c.id}">Go to quizzes</a>`}
      </div>`;
    return;
  }
  view.innerHTML = `<h1 class="ph">Reviewer</h1><p class="sub">Study the topics of your chosen class.</p>${chips(c.id, "reviewer")}
    ${banner(c, c.name + " class", `${doneN(p, c)} of ${c.topics.length} topics done`, `<div class="meter"><i style="width:${pctOf(p, c)}%"></i></div>`)}
    <div class="grid">${c.topics.map((t, i) => `
      <a class="item" href="#/reviewer/${c.id}/${t.id}">
        <span class="num ${d.includes(t.id) ? "ok" : ""}">${d.includes(t.id) ? "✓" : i + 1}</span>
        <div class="grow"><strong>${esc(t.title)}</strong><br><small>${d.includes(t.id) ? "Done" : "Tap to read"}</small></div></a>`).join("")}</div>`;
}

/* ---------- Quizzes ---------- */
let qz = null;
let quizTimer = null;
const QUESTION_SECONDS = 15;
function stopQuizTimer(){ if(quizTimer !== null){clearInterval(quizTimer); quizTimer=null;} }
function startQuizTimer(){
  stopQuizTimer();
  if(!qz || qz.answered || qz.i >= qz.qs.length) return;
  qz.deadline = Date.now() + QUESTION_SECONDS * 1000;
  updateTimer();
  quizTimer = setInterval(updateTimer, 100);
}
function updateTimer(){
  if(!qz || qz.answered){stopQuizTimer();return;}
  const remaining = Math.max(0, Math.ceil((qz.deadline-Date.now())/1000));
  const label = document.getElementById("quizSeconds");
  const bar = document.getElementById("quizTimerBar");
  if(label) label.textContent = remaining;
  if(bar) bar.style.width = `${remaining/QUESTION_SECONDS*100}%`;
  if(remaining===0){
    stopQuizTimer();
    const q=qz.qs[qz.i];
    qz.typed = q.type === "id" ? (document.getElementById("idIn")?.value || "") : "";
    qz.choice = null;
    answer(false, q.type === "id" ? q.id[0] : q.opts.find(o=>o.ok).t, true);
  }
}
function earnedBadges(p){
  const result=[];
  for(const c of CLASSES){
    if(c.topics.length && c.topics.every(t=>(p.done[c.id]||[]).includes(t.id))) result.push({icon:"📚",title:`${c.name} Scholar`,desc:`Completed all ${c.name} reviewer topics`});
    const scores=c.quizzes.map(q=>p.scores[`${c.id}/${q.id}`]).filter(v=>Number.isFinite(v));
    if(scores.some(v=>v>=80)) result.push({icon:"🏅",title:`${c.name} High Achiever`,desc:"Scored at least 80% in a class quiz"});
    if(c.quizzes.length && scores.length===c.quizzes.length && scores.every(v=>v>=80)) result.push({icon:"🏆",title:`${c.name} Quiz Champion`,desc:"Scored 80% or more in every class quiz"});
  }
  return result;
}
const badgesMarkup = (p) => { const badges=earnedBadges(p); return `<section class="achievements"><h2 class="sec">Achievement badges <span class="badge-count">${badges.length} earned</span></h2>${badges.length?`<div class="achievement-grid">${badges.map(b=>`<article class="achievement-card"><span aria-hidden="true">${b.icon}</span><div><strong>${esc(b.title)}</strong><small>${esc(b.desc)}</small></div></article>`).join("")}</div>`:`<p class="sub">Finish all topics in a class or score 80%+ on a quiz to earn your first badge.</p>`}</section>`; };
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\b(the|a|an)\b/g, "").replace(/\s+/g, " ").trim();
function quizzes(cid, qid) {
  const c = cls(cid || P().current); setCurrent(c.id);
  if (qid) return runQuiz(c, qid);
  stopQuizTimer(); qz = null;
  const p = P();
  view.innerHTML = `<h1 class="ph">Quizzes</h1><p class="sub">Test what you learned.</p>${chips(c.id, "quizzes")}
    ${banner(c, c.name + " quizzes", `${c.quizzes.length} quizzes available`)}
    <div class="grid">${c.quizzes.map((q, i) => {
      const s = p.scores[`${c.id}/${q.id}`];
      const cl = s === undefined ? "new" : s >= 80 ? "hi" : s >= 50 ? "mid" : "lo";
      return `<a class="item" href="#/quizzes/${c.id}/${q.id}"><span class="num">${i + 1}</span>
        <div class="grow"><strong>${esc(q.title)}</strong><br><small>${q.questions.length} questions</small></div>
        <span class="pill ${cl}">${s === undefined ? "New" : "Best " + s + "%"}</span></a>`; }).join("")}</div>`;
}
function runQuiz(c, qid) {
  const quiz = c.quizzes.find((q) => q.id === qid);
  if (!quiz) return (location.hash = `#/quizzes/${c.id}`);
  if (!qz || qz.c.id !== c.id || qz.quiz.id !== qid) {
    stopQuizTimer();
    qz = { c, quiz, i: 0, answered: false, choice: null, typed: "", ok: false, score: 0, wrong: [], answers: [], saved: false,
      qs: shuffle(quiz.questions).map((q) => q.id
        ? { type: "id", q: q.q, id: q.id }
        : { type: "mc", q: q.q, opts: shuffle(q.o.map((t, k) => ({ t, ok: k === 0 }))) }) };
    startQuizTimer();
  }
  drawQuiz();
}
function drawQuiz() {
  const { c, quiz } = qz, back = `#/quizzes/${c.id}`;
  if (qz.i >= qz.qs.length) {
    stopQuizTimer();
    const pct = Math.round((qz.score / qz.qs.length) * 100);
    if (!qz.saved) {
      const p = P(), k = `${c.id}/${quiz.id}`;
      p.scores[k] = Math.max(p.scores[k] || 0, pct);
      const attempt = {
        id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        classId: c.id, quizId: quiz.id, quizTitle: quiz.title,
        date: new Date().toISOString(), score: pct, correct: qz.score, total: qz.qs.length,
        answers: qz.answers || []
      };
      p.history = [attempt, ...(p.history || [])].slice(0,300);
      save(p); qz.saved = true;
    }
    const msg = pct >= 80 ? "Great job, Pathfinder!" : pct >= 50 ? "Good effort. Review and try again." : "Keep going. Read the reviewer and retake it.";
    const last = (P().history || []).find(x=>x.classId===c.id && x.quizId===quiz.id);
    view.innerHTML = `<div class="result">${ring(pct, 120)}<h2>${msg}</h2>
      <p>${esc(quiz.title)} · ${qz.score} of ${qz.qs.length} right</p>
      <div class="actions" style="justify-content:center">
        <button class="btn btn-yellow small" data-a="retake">Retake quiz</button>
        <a class="btn btn-ghost small" href="${back}">Back to quizzes</a></div></div>
      ${badgesMarkup(P())}
      <section class="answer-review"><h2 class="sec">Answer review</h2><p class="sub">Review every question and visit the relevant lessons.</p>
      ${(last?.answers || []).map((a,i)=>`<article class="answer-card ${a.ok?'correct':'incorrect'}">
        <div class="answer-top"><strong>${i+1}. ${esc(a.q)}</strong><span>${a.ok?'✓ Correct':'✕ Incorrect'}</span></div>
        <p>Your answer: <b>${esc(a.given || 'No answer (time expired)')}</b></p>
        <p>Correct answer: <b>${esc(a.correct)}</b></p>
        <p class="answer-explanation">${a.ok?'You selected the correct answer.':'Review the correct response and compare it with your answer.'} Use the class reviewer for additional context.</p>
        <a href="#/reviewer/${c.id}">Open ${esc(c.name)} reviewer</a>
      </article>`).join('')}</section>`;
    return;
  }
  const q = qz.qs[qz.i], shown = qz.answered;
  const body = q.type === "id"
    ? `<input id="idIn" class="idin ${shown ? (qz.ok ? "good" : "bad") : ""}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
         placeholder="Type your answer" value="${esc(qz.typed)}" ${shown ? "disabled" : ""} />
       ${shown ? (qz.ok ? `<p class="fb ok">Correct!</p>` : `<p class="fb no">Correct answer: ${esc(q.id[0])}</p>`)
               : `<button class="btn btn-red small" style="width:100%" data-a="check">Check answer</button>`}`
    : q.opts.map((o, k) => `<button class="opt ${shown ? (o.ok ? "good" : k === qz.choice ? "bad" : "") : ""}" data-a="pick" data-k="${k}" ${shown ? "disabled" : ""}><b>${"ABCD"[k]}</b><span>${esc(o.t)}</span></button>`).join("");
  view.innerHTML = `<div class="quiz-active-note">🔒 Quiz in progress · Finish all questions to unlock navigation</div>
    <div class="quiz-timer ${shown ? "timer-finished" : ""}" role="timer" aria-label="Time remaining"><span>⏱ Time left</span><strong><span id="quizSeconds">${shown ? "0" : Math.max(0, Math.ceil(((qz.deadline||Date.now())-Date.now())/1000))}</span>s</strong></div><div class="quiz-timer-track"><span id="quizTimerBar" style="width:${shown?0:100}%"></span></div>
    <p class="sub" style="margin:0">${esc(quiz.title)} · Question ${qz.i + 1} of ${qz.qs.length}</p>
    <div class="qbar"><i style="width:${(qz.i / qz.qs.length) * 100}%"></i></div>
    <span class="pill new" style="display:inline-block;margin-bottom:10px">${q.type === "id" ? "Identification" : "Multiple choice"}</span>
    <h1 class="q">${esc(q.q)}</h1>${body}
    ${shown && qz.timedOut ? `<p class="time-up">⏰ Time is up! The correct answer is shown above.</p>` : ""}
    ${shown ? `<button class="btn btn-red small nextbtn" style="width:100%;margin-top:6px" data-a="next">${qz.i + 1 === qz.qs.length ? "See results" : "Next question"}</button>` : ""}`;
  if (!shown && q.type === "id") document.getElementById("idIn").focus({ preventScroll: true });
  // Do not auto-scroll after every answer: it causes a visible jump/flicker.
}
function answer(ok, correctText, timedOut=false) {
  if(!qz || qz.answered) return;
  stopQuizTimer();
  qz.timedOut = timedOut;
  const q = qz.qs[qz.i];
  qz.answered = true; qz.ok = ok;
  const given = timedOut ? "" : q.type === "id" ? qz.typed : (q.opts[qz.choice]?.t || "");
  qz.answers.push({ q: q.q, given, correct: correctText, ok, timedOut });
  ok ? qz.score++ : qz.wrong.push({ q: q.q, a: correctText });
  drawQuiz();
}

function historyMarkup(p) {
  const attempts = p.history || [];
  const average = attempts.length ? Math.round(attempts.reduce((n,a)=>n+a.score,0)/attempts.length) : 0;
  const best = attempts.length ? Math.max(...attempts.map(a=>a.score)) : 0;
  return `<section class="history-panel"><h2 class="sec">Quiz history & analytics</h2>
    <div class="history-stats"><div><strong>${attempts.length}</strong><small>Total attempts</small></div><div><strong>${average}%</strong><small>Average score</small></div><div><strong>${best}%</strong><small>Highest score</small></div></div>
    ${attempts.length ? `<div class="history-list">${attempts.slice(0,20).map(a=>`<article class="history-item"><div><strong>${esc(cls(a.classId).name)} · ${esc(a.quizTitle)}</strong><small>${esc(new Date(a.date).toLocaleString())} · ${a.correct}/${a.total} correct</small></div><b>${a.score}%</b></article>`).join('')}</div>` : '<p class="sub">No completed quizzes yet. Your attempts will appear here.</p>'}
    <p class="sub">Showing the 20 most recent attempts. Up to 300 attempts are kept in your progress record.</p></section>`;
}

/* ---------- Profile ---------- */
function profile() {
  const p = P(), name = user.displayName || "Pathfinder";
  const sc = Object.values(p.scores), done = CLASSES.reduce((n, x) => n + doneN(p, x), 0);
  view.innerHTML = `
    <div class="pbanner"><span class="av">${esc(name[0].toUpperCase())}</span>
      <div><h1>${esc(name)}</h1><small>${esc(user.email)}</small></div></div>
    <div class="stats">
      <div class="stat"><i>${svg("book")}</i><div><b>${done}</b><span>Topics done</span></div></div>
      <div class="stat"><i>${svg("check")}</i><div><b>${sc.length}</b><span>Quizzes taken</span></div></div>
      <div class="stat"><i>${svg("star")}</i><div><b>${sc.length ? Math.max(...sc) : 0}%</b><span>Top score</span></div></div>
    </div>
    <section class="profile-spotlight"><div class="spotlight-title"><span class="eyebrow">YOUR PATHFINDER STORY</span><h2>Keep learning. Keep shining.</h2><p>Every lesson and every quiz is a step forward.</p></div><div class="spotlight-badges"><strong>${earnedBadges(p).length}</strong><span>badges earned</span></div></section>
    <section class="badge-gallery"><div class="home-section-title"><div><h2 class="sec">Badge collection</h2><p class="sub">Unlocked badges are highlighted. Keep going to earn the rest.</p></div></div>
    <div class="badge-gallery-grid">${CLASSES.flatMap(c => [
      {icon:'📚',title:`${c.name} Scholar`,desc:'Complete all reviewer topics'},
      {icon:'🏅',title:`${c.name} High Achiever`,desc:'Score 80% or higher'},
      {icon:'🏆',title:`${c.name} Quiz Champion`,desc:'Score 80%+ in all class quizzes'}
    ]).map(b => { const unlocked = earnedBadges(p).some(x => x.title === b.title); return `<article class="gallery-badge ${unlocked ? 'unlocked' : 'locked'}"><span aria-hidden="true">${unlocked ? b.icon : '🔒'}</span><div><strong>${esc(b.title)}</strong><small>${esc(b.desc)}</small></div><em>${unlocked ? 'Earned' : 'Locked'}</em></article>`; }).join('')}</div></section>
    ${historyMarkup(p)}
    <section class="theme-panel"><div><h2>Appearance</h2><p>Choose a comfortable look for your dashboard.</p></div>
      <div class="theme-options" role="group" aria-label="Color theme"><button type="button" data-a="theme" data-mode="light" class="theme-option ${document.documentElement.dataset.theme === "light" ? "selected" : ""}">☀ Light mode</button><button type="button" data-a="theme" data-mode="dark" class="theme-option ${document.documentElement.dataset.theme === "dark" ? "selected" : ""}">☾ Dark mode</button></div></section>
    <h2 class="sec">Progress by class</h2>
    <div class="prow">${CLASSES.map((c) => `
      <a class="item" href="#/reviewer/${c.id}" style="--c:${c.color}">
        ${ring(pctOf(p, c), 52, c.color, "#F3EAC4", "#2A0A0D")}
        <div class="grow"><strong>${c.name}</strong><br><small>${doneN(p, c)} of ${c.topics.length} topics done</small></div></a>`).join("")}</div>
    <div class="actions"><button class="btn btn-red small" data-a="logout">Log out</button></div>`;
}

/* ---------- Clicks ---------- */
function checkId() {
  const q = qz.qs[qz.i], v = document.getElementById("idIn").value;
  if (!norm(v) || qz.answered) return;
  qz.typed = v;
  answer(q.id.some((x) => norm(x) === norm(v)), q.id[0]);
}
view.addEventListener("click", (e) => {
  const b = e.target.closest("[data-a]"); if (!b) return;
  const a = b.dataset.a;
  if (a === "theme") { applyTheme(b.dataset.mode); profile(); }
  else if (a === "toggle") {
    const p = P(), d = (p.done[b.dataset.c] ||= []), i = d.indexOf(b.dataset.t);
    i < 0 ? d.push(b.dataset.t) : d.splice(i, 1); save(p); route();
  } else if (a === "pick" && qz && !qz.answered) {
    qz.choice = +b.dataset.k; const q = qz.qs[qz.i];
    answer(q.opts[qz.choice].ok, q.opts.find((x) => x.ok).t);
  } else if (a === "check" && qz) checkId();
  else if (a === "next" && qz && qz.answered) { qz.i++; qz.answered = false; qz.choice = null; qz.typed = ""; qz.ok = false; qz.timedOut = false; if(qz.i < qz.qs.length) startQuizTimer(); drawQuiz(); window.scrollTo({ top: 0, behavior:"instant" }); }
  else if (a === "retake") { stopQuizTimer(); qz = null; route(); }
  else if (a === "logout") signOut(auth);
});
view.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "idIn" && qz) { e.preventDefault(); checkId(); } });

/* ---------- Fast initial skeleton while Firebase restores session. */
if (!view.hasChildNodes()) view.innerHTML = `<div class="dash-skeleton" aria-live="polite"><div class="sk-head"></div><div class="sk-row"><div></div><div></div><div></div></div><div class="sk-row"><div></div><div></div><div></div></div></div>`;
/* ---------- Auth guard ---------- */
onAuthStateChanged(auth, (u) => {
  if (!u) return (location.href = "auth.html");
  user = u;
  const nm = u.displayName || "Pathfinder";
  $("meName").textContent = nm; $("meMail").textContent = u.email;
  $("avSide").textContent = $("avTop").textContent = nm[0].toUpperCase();
  if (!location.hash) location.hash = "#/home";
  else route();
  void loadCloudProgress();
});
// Keep an unfinished quiz on screen even when the user clicks another tab or uses browser Back.
let quizLockHash = null;
let restoringQuizHash = false;
const isQuizActive = () => !!(qz && qz.i < qz.qs.length);
function showQuizLock() {
  if (document.getElementById("quizLockDialog")) return;
  const overlay = document.createElement("div");
  overlay.id = "quizLockDialog";
  overlay.className = "quiz-lock-overlay";
  overlay.innerHTML = `<div class="quiz-lock-card" role="alertdialog" aria-modal="true" aria-labelledby="quizLockTitle" aria-describedby="quizLockDesc"><div class="lock-emoji">🔒</div><h2 id="quizLockTitle">Finish the quiz first</h2><p id="quizLockDesc">You're doing great! Complete all questions before switching to another tab. Your answers will stay right here.</p><button class="btn btn-red small" type="button" id="quizLockOkay">Continue quiz</button></div>`;
  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); document.getElementById("idIn")?.focus({preventScroll:true}); };
  overlay.querySelector("#quizLockOkay").addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  overlay.querySelector("#quizLockOkay").focus();
}
function currentQuizHash() { return qz ? `#/quizzes/${qz.c.id}/${qz.quiz.id}` : null; }
document.addEventListener("click", (e) => {
  if (!isQuizActive()) return;
  const link = e.target.closest("a[href]");
  if (!link) return;
  const target = link.getAttribute("href");
  if (target?.startsWith("#/") && target !== currentQuizHash()) { e.preventDefault(); showQuizLock(); }
}, true);
window.addEventListener("hashchange", () => {
  if (!user) return;
  if (isQuizActive() && location.hash !== currentQuizHash()) {
    restoringQuizHash = true;
    history.replaceState(null, "", currentQuizHash());
    showQuizLock();
    return;
  }
  restoringQuizHash = false;
  route();
});

window.addEventListener("beforeunload", (e) => { if (isQuizActive()) { e.preventDefault(); e.returnValue = ""; } });
