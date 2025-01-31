'use client'
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ sendMessage, setMessage, message, handleImageSelection }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const addEmoji = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false); 
    };

    return (
        <div className="w-full relative">
            {showEmojiPicker && (
                <div className="w-full scrollbar-hide absolute bottom-14 left-0 z-10">
                    <EmojiPicker onEmojiClick={addEmoji} />
                </div>
            )}

            <div className="flex p-3 border-t bg-white items-center">
                <button 
                    className="bg-gray-200 p-2 rounded-lg mr-2 text-gray-600 hover:bg-gray-300"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <BsEmojiSmile size={24} />
                </button>

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 p-2 border rounded-l-lg outline-none bg-gray-100"
                    placeholder="Type a message..."
                    style={{wordWrap:'break-word'}}
                />

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelection}
                    className="hidden"
                    id="fileUpload"
                />
                <label htmlFor="fileUpload" className="bg-blue-500 text-white mx-2 py-2 px-3 rounded-lg cursor-pointer hover:bg-blue-600">
                    <FaRegImage />
                </label>

                <button onClick={sendMessage} className="bg-green-500 text-white py-3 px-6 rounded-r-lg hover:bg-green-600">
                    <IoSend />
                </button>
            </div>
        </div>
    );
}
