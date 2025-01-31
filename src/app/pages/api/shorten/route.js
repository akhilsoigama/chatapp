import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Urls } from "../../model/urlSchemas";
import { connectionStr } from "@/app/lib/db";

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

export async function GET() {
    try {
        await connectDB();
        const data = await Urls.find(); 
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const payload = await req.json(); 
        const { originalUrl, shortId } = payload; 

        const existingUrl = await Urls.findOne({ originalUrl });
        if (existingUrl) {
            return NextResponse.json({ success: false, message: 'URL already exists' });
        }

        const newUrl = new Urls({ originalUrl, shortId });

        await newUrl.save();

        return NextResponse.json({success: true,message: 'New URL added successfully',newUrl: newUrl });
    } catch (error) {
        return NextResponse.json({ message: "Failed to shorten URL" }, { status: 500 });
    }
}
