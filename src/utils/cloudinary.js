 import {v2 as cloudinary} from "cloudinary"
 import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try{
if(!localFilePath) return null
// upload the file o cloudinary
 const response = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "auto"
  })
  // So file has uploaded successfully
  console.log("file is uploaded on cloudinary" , response.url);
  return response;
    }catch(error){
    fs.unlinkSync(localFilePath)  // it just remove the file that was on your local server after uploaded on main server
    return null
    }
}

export{uploadOnCloudinary}
