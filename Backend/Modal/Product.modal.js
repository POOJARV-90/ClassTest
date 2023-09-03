import mongoose, { Schema } from "mongoose";

const Userschema = new Schema({
    name:{
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true
    },
    price:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    }
   
})

export default mongoose.model("Product", Userschema )