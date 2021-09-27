// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyB3ihakYVIm0QineM-5mhxapktd7BYaj-4",
  authDomain: "socialar.firebaseapp.com",
  projectId: "socialar",
  storageBucket: "socialar.appspot.com",
  messagingSenderId: "246762508518",
  appId: "1:246762508518:web:cf9a177bd83d15337e2b27",
  measurementId: "G-TPXF7RHHQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getMessageDetails = async (messageID) => {
	const docRef = doc(db, "messages", messageID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return  docSnap.data();
	}
	else{
		return {}
	}
}

export const getUserDetails = async (userID) => {
	const docRef = doc(db, "users", userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return  docSnap.data();
	}
	else{
		return {}
	}
}