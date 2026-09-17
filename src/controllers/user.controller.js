import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {user, User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/"
import { ApiResponse } from "../utils/ApiResponse.js";
const  registerUser = asyncHandler(async(req,res) => {
console.log("HIT THE HANDLER")
  // steps to register a user
 // 1. get user details from frontend
 // 2. validation
 // 3. check if user already exist : username , email
 // 4. check for images , check for avatar
 // 5. upload them to cloudinary
 // 6. create user object - crate entry in db
 // 7. remove password and refresh token field form response
 // 8. check fro user creation 
 // 9. return response
 
 const {fullName, email, username, password}= req.body 
 console.log("email: ", email);

if(
[fullName , email , username , password].some((field)=>{
  field?.trim()===""
})
){
throw new ApiError(400,"All fields are required")
}  
const existedUser = User.findOne({
    $or: [{username} , {email}]
})
if(existedUser) {
 throw new ApiError(409, "User with email or username already exists")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
     throw new ApiError(400, "Avatar file is required")
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username:  username.toLowerCase()
})
const createdUser= await User.findById(user.id).select(
    "-password -refreshToken "
)
if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,  createdUser, "User registered successfully")
)
})

export {registerUser}