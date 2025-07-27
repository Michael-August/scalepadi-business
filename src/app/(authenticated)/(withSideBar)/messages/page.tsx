"use client";

import { useState } from "react";
import { Send, Search } from "lucide-react";
import Image from "next/image";

const experts = [
  { name: "David Eze", role: "Admin", avatar: "/images/profile-pic.svg" },
  { name: "Company name", role: "Thank you for the job...", avatar: "/images/profile-pic.svg" },
  { name: "Salman Khan Bhai", role: "Product Designer", avatar: "/images/profile-pic.svg" },
  { name: "Jenifer Ola Obi", role: "Business Expert", avatar: "/images/profile-pic.svg" },
];

export default function MessagesPage() {
    const [selectedExpert, setSelectedExpert] = useState(experts[0]);
    const [messages, setMessages] = useState([
        { from: "Company name", text: "Nice lets get moving" },
        { from: "Scalepadi expert", text: "I will populate the key focus areas for your business and suggested experts that can help you achieve your goals" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { from: "ScalePadi Ai", text: input }]);
        setInput("");
    };

    return (
        <div className="flex h-screen w-full">
            <div className="w-72 border-r p-4 flex flex-col">
                <div className="flex items-center gap-2 border px-2 py-1 rounded">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        placeholder="Search expert"
                        className="flex-1 outline-none text-sm"
                    />
                </div>
                <div className="flex-1 mt-4 overflow-y-auto">
                    {experts.map((expert) => (
                        <div
                            key={expert.name}
                            onClick={() => setSelectedExpert(expert)}
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                                selectedExpert.name === expert.name ? "bg-gray-100" : ""
                            }`}
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image src={expert.avatar} alt={expert.name} width={32} height={32} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold">{expert.name}</div>
                                <div className="text-xs text-gray-500 truncate w-40">{expert.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="border-b p-4 text-lg font-semibold flex items-center">
                    {selectedExpert.name}
                </div>
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`${
                                msg.from === "ScalePadi Ai" ? "self-end text-right" : "self-start text-left"
                            }`}
                        >
                        <div className="text-xs text-gray-500 mb-1">{msg.from}</div>
                            <div className={`p-2 rounded max-w-xs text-sm ${
                                msg.from === "ScalePadi Ai" ? "bg-blue-100" : "bg-gray-100"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t p-4 flex items-center gap-2">
                    <div className="flex items-center gap-2 border rounded p-2 flex-1">
                        <Image src="/scalepadi-ai-logo.svg" alt="AI" width={20} height={20} />
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type in your message"
                            className="flex-1 outline-none text-sm"
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 text-white p-2 rounded"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
