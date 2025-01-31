'use client'
export default function MessageList({ messages, userId, setReplyingTo, messagesEndRef }) {
    return (
        <div className="flex-1 overflow-y-auto text-xl p-4 space-y-2 scrollbar-hide">
            {messages.map((msg, index) => (
                <div key={index} 
                    className={`max-w-[70%] p-3 rounded-lg shadow-md text-sm ${msg.sender === userId ? "bg-green-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start"}`} 
                    onClick={() => setReplyingTo(msg)}
                    style={{ wordWrap: 'break-word' }} 
                >
                    {msg.replyTo && (
                        <div className="text-xs text-gray-500 italic border-l-2 pl-2 border-gray-400 mb-1">
                            Replying to: {typeof msg.replyTo === "string" ? msg.replyTo : "an image"}
                        </div>
                    )}
                    {msg.type === "text" ? (
                        <p className="break-words">{msg.text}</p> 
                    ) : (
                        <img src={msg.imageUrl} alt="Sent" className="max-w-full rounded-lg shadow-sm" />
                    )}
                    <span className="text-xs text-gray-600 text-end block mt-1">{msg.timestamp}</span>
                </div>
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
}
