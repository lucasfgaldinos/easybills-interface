import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBA7TNL6vWTEuvdFvx2gWUIZby5S6pQgm4",
//   authDomain: "easybills-1f3db.firebaseapp.com",
//   projectId: "easybills-1f3db",
//   storageBucket: "easybills-1f3db.firebasestorage.app",
//   messagingSenderId: "690104416647",
//   appId: "1:690104416647:web:6144daf328f12cbdc0fb22"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
