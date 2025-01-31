import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server"; 
import { Urls } from "@/app/pages/model/urlSchemas";

async function connectDB() {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.error("Database connection error:", err);
            throw new Error("Database connection error");
        }
    }
}

export async function GET({ params }) {
    try {
        await connectDB();

        const { shortId } = params;  
        const urlData = await Urls.findOne({ shortId });

        if (!urlData) {
            return NextResponse.json({ success: false, message: "URL not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, originalUrl: urlData.originalUrl });

    } catch (err) {
        console.error("Error fetching URL:", err);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
