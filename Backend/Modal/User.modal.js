import mongoose, { Schema } from "mongoose";

const Userschema = new Schema({
    name:{
        type : String,
        required : true
    },
    number:{
        type : String,
        required : true
    },
    pin:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        enum :["Buyer","Seller","Admin"],
        default:"Buyer"
    }
})

export default mongoose.model("User", Userschema )