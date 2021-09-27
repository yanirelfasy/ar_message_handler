// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where} from 'firebase/firestore/lite';

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
	const q = query(collection(db, "messages"), where("id", "==", messageID));
	let messages = await getDocs(q)
	let result = {};
	messages.forEach(doc => result = doc.data());
	return result;
}

export const getUserDetails = async (userID) => {
	const q = query(collection(db, "users"), where("userID", "==", userID));
	let users = await getDocs(q)
	let result = {};
	users.forEach(doc => result = doc.data());
	return result;
}