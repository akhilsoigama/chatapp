"use client";

import { useState, useEffect, useRef } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import io from "socket.io-client";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:3001");
const sendSound = new Audio("/send.mp3");

export default function Chat() {
    const { user, isSignedIn } = useUser(); // ✅ Clerk se user data fetch kar rahe hain
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!isSignedIn) return; // Agar user logged in nahi hai toh kuch mat karo

        const handleMessage = (msg) => setMessages((prev) => [...prev, msg]);
        const handleImage = (imgData) => setMessages((prev) => [...prev, imgData]);

        socket.on("message", handleMessage);
        socket.on("image", handleImage);

        return () => {
            socket.off("message", handleMessage);
            socket.off("image", handleImage);
        };
    }, [isSignedIn]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleImageSelection = (e) => {
        const files = Array.from(e.target.files);
        const imagesArray = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setSelectedImages((prev) => [...prev, ...imagesArray]);
    };

    const sendMessage = () => {
        if (!isSignedIn) return alert("Please sign in to send messages!");

        if (message.trim() || selectedImages.length > 0) {
            if (message.trim()) {
                const newMessage = {
                    type: "text",
                    text: message,
                    sender: user.id, // ✅ Clerk ka user ID
                    username: user.fullName || user.username, // ✅ Clerk ka username
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    replyTo: replyingTo ? replyingTo.text || "an image" : null,
                };
                socket.emit("message", newMessage);
                setMessage("");
                sendSound.play();
            }

            if (selectedImages.length > 0) {
                selectedImages.forEach(({ file }) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        const newImage = {
                            type: "image",
                            imageUrl: reader.result,
                            sender: user.id, // ✅ Clerk user ID
                            username: user.fullName || user.username, // ✅ Clerk username
                            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            replyTo: replyingTo ? replyingTo.imageUrl || "image" : null,
                        };
                        socket.emit("image", newImage);
                        sendSound.play();
                    };
                });
                setSelectedImages([]);
            }
            setReplyingTo(null);
        }
    };

    return (
        <div className="max-w-md mx-auto h-screen flex flex-col bg-[#e5ddd5]">
            {/* Agar user logged in nahi hai toh login button dikhayein */}
            {!isSignedIn ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <p className="text-lg">Please Sign In to Chat</p>
                    <SignInButton className="bg-green-500 text-white px-4 py-2 rounded-lg" />
                </div>
            ) : (
                <>
                    <ChatHeader username={user.fullName || user.username} />
                    <MessageList messages={messages} userId={user.id} setReplyingTo={setReplyingTo} messagesEndRef={messagesEndRef} />
                    <MessageInput sendMessage={sendMessage} setMessage={setMessage} message={message} handleImageSelection={handleImageSelection} />
                  
                </>
            )}
        </div>
    );
}
