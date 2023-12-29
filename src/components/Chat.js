// Chat.js

import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { FaLocationArrow } from "react-icons/fa6";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to the discussion</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.user === auth.currentUser.displayName ? 'self' : 'other'}`}>
           <div className={`message ${message.photoURL === auth.currentUser.photoURL ? 'photoSelf' : 'photoOther'}`}> {message.photoURL && <img src={message.photoURL} alt="User" className="user-photo" />}</div>
            <div className="message-content">
              <span className={`message ${message.user === auth.currentUser.displayName ? 'nameSelf' : 'nameOther'}`}>{message.user}</span>
              <span className="text">{message.text}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          <FaLocationArrow />
        </button>
      </form>
    </div>
  );
};
