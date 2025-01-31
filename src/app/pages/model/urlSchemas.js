import mongoose from "mongoose";

const UrlSchemas = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
},);

export const Urls = mongoose.models.urls || mongoose.model("urls", UrlSchemas);
