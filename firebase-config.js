// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFx5CvwOREc03_vb7b1HwipAhgcQCSv4w",
    authDomain: "bugdetplanner-2d2de.firebaseapp.com",
    databaseURL: "https://bugdetplanner-2d2de-default-rtdb.firebaseio.com/", // Realtime Database
    projectId: "bugdetplanner-2d2de",
    storageBucket: "bugdetplanner-2d2de.appspot.com", // Fixed storageBucket
    messagingSenderId: "755285585552",
    appId: "1:755285585552:web:9654fc49d3aecbce4bf215",
    measurementId: "G-YS2ZZXGMDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Firebase Database

// Export database so it can be used in other files
export { app, database };
