'use client'
import { use, useEffect } from 'react';
import axios from 'axios';

export default function ShortUrlPage({params}) {
    const { shortId } = use(params)

    useEffect(() => {
        
        if (shortId) {
            const fetchOriginalUrl = async () => {
                    const response = await axios.get(`/pages/api/shorten/${shortId}`);
                    const originalUrl = response.data.originalUrl;
                    if (originalUrl) {
                        window.location.href = originalUrl;
                    } else {
                    }
            };
            fetchOriginalUrl(); 
        }
    }, [shortId]); 
    return (
        <div>
            <p>Original Url: {shortId}</p>
        </div>
    );
}
