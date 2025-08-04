import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAezdN0iKR2goLZT7KvWTUfJSzOrfL9n80",
  authDomain: "singhblogs-123.firebaseapp.com",
  projectId: "singhblogs-123",
  storageBucket: "singhblogs-123.firebasestorage.app",
  messagingSenderId: "972914232528",
  appId: "1:972914232528:web:01a62fe1bc7c05575762d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
