import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// PALITAN mo ito ng config mula sa Firebase Console (Project settings > Your apps > Web app)
const firebaseConfig = {
apiKey: "AIzaSyD9ju-nW6Aj7Ff0TUUX0vQsfyENa3_4Ths",
  authDomain: "pathfinder-club-9bbb3.firebaseapp.com",
  projectId: "pathfinder-club-9bbb3",
  storageBucket: "pathfinder-club-9bbb3.firebasestorage.app",
  messagingSenderId: "543232714621",
  appId: "1:543232714621:web:301d62899d1fadea47ce14"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);