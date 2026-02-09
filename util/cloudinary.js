import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: proccess.env.CLOUDINARY_API_KEY, 
    api_secret:proccess.env.CLOUDINARY_API_SECRET
  });


const uploadOnCloudinary = async(localFilePath) => {
  try {
    if(!localFilePath)  return null
    //uploading file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    }) 
    //file uploaded successfully

  console.log("file is uploaded on cloudinary", response.secure_url);
  return response
  
} catch (error) {
    fs.unlinkSync(localFilePath) //removing file from local 
    console.log("error while uploading on cloudinary", error);
    return null
}}


export {uploadOnCloudinary}