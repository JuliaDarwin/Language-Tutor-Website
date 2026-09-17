"use client";
import { useState, useEffect } from "react";
import PusherClient from "pusher-js";
import { useUser } from "@clerk/nextjs";
import { getMessages, getChatUsers, sendMessage } from "./actions";

export default function Messages() {
    const { user, isLoaded } = useUser();
    const isAdmin = user?.publicMetadata?.role === "admin";
    
    // For admin: which student they are currently talking to
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [chatUsers, setChatUsers] = useState<{userId: string, userName: string}[]>([]);
    
    const [msg, setMsg] = useState("");
    const [msgArray, setMsgArray] = useState<any[]>([]);

    // The chat room we are currently looking at
    // If student: their own ID. If admin: the selected user's ID
    const activeChatId = isAdmin ? selectedUserId : user?.id;

    // Fetch chat users (only for admin)
    useEffect(() => {
        if (isAdmin) {
            getChatUsers().then(setChatUsers);
            
            // Admin should listen to 'admin-inbox' to know if a new user messaged
            const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
                cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
            });
            const channel = pusher.subscribe("admin-inbox");
            channel.bind("new-message", (newMsg: any) => {
                // If it's a new user we haven't seen before, add to sidebar
                setChatUsers(prev => {
                    if (!prev.find(u => u.userId === newMsg.userId)) {
                        return [...prev, { userId: newMsg.userId, userName: newMsg.userName || "Student" }];
                    }
                    return prev;
                });
            });
            return () => pusher.unsubscribe("admin-inbox");
        }
    }, [isAdmin]);

    // Fetch messages for the active chat
    useEffect(() => {
        if (!activeChatId) {
            setMsgArray([]);
            return;
        }

        // 1. Load history from database
        getMessages(activeChatId).then(setMsgArray);

        // 2. Listen for new real-time messages
        const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        });

        const channel = pusher.subscribe(`user-chat-${activeChatId}`);
        channel.bind("new-message", (newMsg: any) => {
            // We only add it if someone ELSE sent it, because our own send function adds it instantly
            if (newMsg.senderId !== user?.id) {
                setMsgArray(prev => [...prev, newMsg]);
            }
        });

        return () => {
            pusher.unsubscribe(`user-chat-${activeChatId}`);
        };
    }, [activeChatId, user?.id]);

    const handleSend = async () => {
        if (!activeChatId || !user) return;
        if (!msg.trim()) return;
        
        const studentName = user.fullName || user.firstName || "Student";
        const msgUserName = isAdmin ? "Admin" : studentName;

        const tempMsg = {
            id: "temp-" + Date.now(), // Temporary ID for React key
            text: msg,
            senderId: user.id,
            userId: activeChatId,
            userName: msgUserName,
            createdAt: new Date()
        };
        
        // Optimistic update
        setMsgArray(prev => [...prev, tempMsg]);
        setMsg("");
        
        // Send to server
        await sendMessage(activeChatId, msgUserName, user.id, tempMsg.text);
    };

    if (!isLoaded) return <div className="text-center mt-20">Loading...</div>;

    // UI Structure
    return (
        <div className="max-w-5xl mx-auto my-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex h-[600px]">
            {/* Sidebar for Admin */}
            {isAdmin && (
                <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
                    <h2 className="text-lg font-semibold p-4 border-b">Students</h2>
                    <div className="overflow-y-auto flex-1">
                        {chatUsers.map(u => (
                            <button
                                key={u.userId}
                                onClick={() => setSelectedUserId(u.userId)}
                                className={`w-full text-left p-4 border-b hover:bg-gray-100 transition ${selectedUserId === u.userId ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                            >
                                {u.userName && u.userName !== "Admin" ? u.userName : u.userId.slice(0, 8)}
                            </button>
                        ))}
                        {chatUsers.length === 0 && <p className="p-4 text-gray-500 text-sm">No conversations yet.</p>}
                    </div>
                </div>
            )}

            {/* Main Chat Area */}
            <div className={`flex flex-col ${isAdmin ? 'w-2/3' : 'w-full'}`}>
                <h1 className="text-xl font-semibold p-6 bg-white border-b text-gray-800">
                    {isAdmin ? (selectedUserId ? `Chat with ${chatUsers.find(u => u.userId === selectedUserId)?.userName || selectedUserId.slice(0, 8)}` : "Select a student to chat") : "Ask Your Tutor"}
                </h1>
                
                <div id="msgContainer" className="bg-gray-50 flex-1 w-full p-4 overflow-y-auto flex flex-col gap-2">
                    {(!isAdmin || selectedUserId) && msgArray.map((message, index) => {
                        const isOurs = message.senderId === user?.id;
                        const bubbleClass = isOurs 
                            ? "bg-blue-500 text-white ml-auto rounded-l-2xl rounded-tr-2xl" 
                            : "bg-white border border-gray-200 text-gray-800 mr-auto rounded-r-2xl rounded-tl-2xl shadow-sm";
                        
                        return(
                            <div key={message.id || index} className={`flex flex-col ${isOurs ? 'items-end' : 'items-start'} mb-2`}>
                                <p className={`px-4 py-2 max-w-[75%] w-fit ${bubbleClass} break-words`}>
                                    {message.text}
                                </p>
                                <span className="text-xs text-gray-400 mt-1 mx-1">
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )
                    })}
                    {isAdmin && !selectedUserId && (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Select a conversation from the sidebar to start chatting.
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t flex gap-3">
                    <input 
                        id="msgInput" 
                        type="text" 
                        placeholder="Type your message..." 
                        value={msg} 
                        disabled={isAdmin && !selectedUserId}
                        onChange={(e)=>setMsg(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-100"
                    />
                    <button 
                        id="enviar" 
                        onClick={handleSend}
                        disabled={!msg.trim() || (isAdmin && !selectedUserId)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}