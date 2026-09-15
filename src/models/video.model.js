import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from 
"mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
videoFile: {
    type: String, //Cloudnary ur;
    required: true
},
title: {
    type: String, 
    required: true
},
description: {
    type: String, 
    required: true
},
duration: {
    type:Number, //Cloudnary ur;
    required: true
},
views: {
    type: Number, //Cloudnary ur;
    default: 0
},
isPublished: {
    type: Boolean,
    default: true
},
owner : {
    type: Schema.Types. ObjectId,
ref: "User"
}
},{timetamps: true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video" , videoSchema)