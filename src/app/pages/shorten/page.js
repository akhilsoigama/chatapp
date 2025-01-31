"use client";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
    const [originalUrl, setOrignalUrl] = useState("");
    const [shortId, setshortId] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const urls = {
        originalUrl,
        shortId
    };

    const shortenUrl = async () => {
        try {
            const response = await axios.post("/pages/api/shorten", urls, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.success) {
                toast.success(response.data.message);  
                setShortUrl(`${process.env.NEXT_PUBLIC_HOST}/${shortId}`);
                setOrignalUrl('');
                setshortId('');
            } else {
                toast.error(response.data.message); 
            }
        } catch (error) {
            toast.error(`Error shortening URL: ${error.message}`); 
        }
    };

    return (
        <div className="w-full">
            <Navbar />
            <div className="flex flex-col items-center bg-rose-800/35 p-10">
                <h1 className="text-3xl font-bold mb-5">URL Shortener</h1>

                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOrignalUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="border p-2 rounded w-96 mb-2"
                />
                <input
                    type="text"
                    value={shortId}
                    onChange={(e) => setshortId(e.target.value)}
                    placeholder="Custom Short Name (optional)"
                    className="border p-2 rounded w-96 mb-2"
                />
                <button
                    onClick={shortenUrl}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Shorten
                </button>

                {shortUrl && (
                    <p className="mt-5 text-xl">
                        Shortened URL: <Link href={shortUrl} target="_blank" className="text-blue-600 underline">{shortUrl}</Link>
                    </p>
                )}
            </div>
        </div>
    );
}
