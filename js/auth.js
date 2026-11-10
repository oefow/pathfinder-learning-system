import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const $ = (s) => document.querySelector(s);
const card = $("#card");
const loginForm = $("#loginForm");
const registerForm = $("#registerForm");

// Kung naka-login na, diretso sa dashboard
onAuthStateChanged(auth, (user) => { if (user) location.href = "dashboard.html"; });

/* ---------- Tabs ---------- */
function showTab(tab) {
  card.dataset.tab = tab;
  document.querySelectorAll(".tab").forEach((t) => {
    const active = t.dataset.tab === tab;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active);
  });
  clearMsg();
}
document.querySelectorAll("[data-tab]").forEach((el) =>
  el.addEventListener("click", () => showTab(el.dataset.tab))
);

/* ---------- Show / hide password ---------- */
document.querySelectorAll(".eye").forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling.previousElementSibling;
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.textContent = show ? "Hide" : "Show";
  })
);

/* ---------- Helpers ---------- */
const msg = $("#msg");
function setMsg(text, type = "error") { msg.textContent = text; msg.className = `msg ${type}`; }
function clearMsg() { msg.textContent = ""; msg.className = "msg"; }
function busy(form, state) {
  const b = form.querySelector("button[type=submit]");
  b.disabled = state;
  b.classList.toggle("loading", state);
}
const errors = {
  "auth/invalid-credential": "Wrong email or password. Check them and try again.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Wrong password. Try again or reset it.",
  "auth/email-already-in-use": "That email already has an account. Try signing in.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
  "auth/network-request-failed": "No connection. Check your internet and try again.",
};
const friendly = (e) => errors[e.code] || "Something went wrong. Please try again.";

/* ---------- Login ---------- */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMsg(); busy(loginForm, true);
  try {
    await signInWithEmailAndPassword(auth, $("#loginEmail").value.trim(), $("#loginPass").value);
    setMsg("Signed in. Taking you to your dashboard…", "ok");
  } catch (err) { setMsg(friendly(err)); busy(loginForm, false); }
});

/* ---------- Register ---------- */
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMsg();
  const name = $("#regName").value.trim();
  const club = $("#regClub").value.trim();
  const pass = $("#regPass").value;
  if (pass !== $("#regPass2").value) return setMsg("Passwords do not match.");
  busy(registerForm, true);
  try {
    const cred = await createUserWithEmailAndPassword(auth, $("#regEmail").value.trim(), pass);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, "users", cred.user.uid), {
      name, club, email: cred.user.email, role: "member", createdAt: serverTimestamp(),
    });
    setMsg("Account created. Welcome, Pathfinder!", "ok");
  } catch (err) { setMsg(friendly(err)); busy(registerForm, false); }
});

/* ---------- Forgot password ---------- */
$("#forgot").addEventListener("click", async () => {
  const email = $("#loginEmail").value.trim();
  if (!email) return setMsg("Type your email first, then tap Forgot password.");
  try { await sendPasswordResetEmail(auth, email); setMsg("Reset link sent. Check your inbox.", "ok"); }
  catch (err) { setMsg(friendly(err)); }
});
// Back to landing with the same Pathfinder-style transition, no long artificial delay.
document.getElementById("backToLanding")?.addEventListener("click", (e) => {
  e.preventDefault();
  const overlay=document.getElementById("authReturnLoader");
  overlay.classList.add("show"); overlay.setAttribute("aria-hidden","false");
  setTimeout(()=>{ location.href="index.html"; }, 550);
});
