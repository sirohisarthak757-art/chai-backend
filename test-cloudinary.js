import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log("Testing with:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY)

cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
    .then((res) => console.log("SUCCESS:", res.url))
    .catch((err) => console.log("FULL ERROR:", err))