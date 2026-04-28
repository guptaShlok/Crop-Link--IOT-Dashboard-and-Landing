import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYaHtGNBQopHrVmmrbMYnw5EoooIde_MU",
  authDomain: "crop-link-c2a70.firebaseapp.com",
  projectId: "crop-link-c2a70",
  storageBucket: "crop-link-c2a70.firebasestorage.app",
  messagingSenderId: "92239229666",
  appId: "1:92239229666:web:ae0cae8aaaf3e85ebc64bb",
  measurementId: "G-D7LG76XWSJ"
};

let app;
if (typeof window !== 'undefined') {
  const apps = getApps();
  app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];
}

export const auth = app ? getAuth(app) : null;

export default app;
