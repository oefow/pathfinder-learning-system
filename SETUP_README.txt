PATHFINDER — QUIZ RESULTS, HISTORY & FIRESTORE SYNC

1. BACK UP your existing project. Open this folder using Live Server or your local HTTP server.
2. Firebase Console > Firestore Database > Rules: review and publish firestore.rules.
   IMPORTANT: These example rules cover /users/{uid} and /progress/{uid} only.
   If you have other collections or custom rules, merge rather than blindly replacing them.
3. Make sure Firestore Database exists in the Firebase project configured in js/firebase-config.js.
4. Sign in. Finish a quiz. Open Profile to see history and analytics.
5. Test another browser/device with the same account to verify cloud sync.
6. Use browser developer console for permission-denied or network errors.

HOW IT WORKS
- Local progress loads immediately; Firestore is merged asynchronously.
- Best scores and reviewer completions are merged across devices.
- Each finished quiz creates a history entry with question-level answers.
- Up to 300 attempts are stored per account; the Profile displays 20 recent attempts.
- Results show correct answers and link to the class reviewer. The short guidance is generic;
  it is NOT yet a teacher-written explanation for every individual question.
- The user can still inspect or modify browser-side answers and scores. This is not secure
  exam grading and is not an anti-cheating backend.
- Firestore has a 1 MiB document limit. A high volume of attempts may eventually need
  an attempts subcollection instead of the single progress document.
- Concurrent writes from multiple devices may still race; for production, use transactional
  server-side updates or separate per-attempt documents.
