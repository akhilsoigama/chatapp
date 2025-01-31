"use client";

import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:3001");
const sendSound = new Audio("/send.mp3");

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null);
    const userId = useRef(Math.random().toString());
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
        socket.on("image", (imgData) => setMessages((prev) => [...prev, imgData]));
    }, []);

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
        if (message.trim() || selectedImages.length > 0) {
            if (message.trim()) {
                const newMessage = {
                    type: "text",
                    text: message,
                    sender: userId.current,
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
                            sender: userId.current,
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
            <ChatHeader />
            <MessageList messages={messages} userId={userId.current} setReplyingTo={setReplyingTo} messagesEndRef={messagesEndRef} />
            <MessageInput sendMessage={sendMessage} setMessage={setMessage} message={message} handleImageSelection={handleImageSelection} />
        </div>
    );
}
