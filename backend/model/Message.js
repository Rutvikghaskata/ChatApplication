const mongoose = require("mongoose");
const Message = new mongoose.Schema({
  SenderName: {
    type: String,
    required: true,
  },
  ReceiverName:{
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  Reaction:[
    {
      react:{
        type:String,
        required:true,
      },
      user:{
        type:String,
        required:true,
      }
    }
  ]
},
{
  timestamps: true
}
);


mongoose.model("Messages", Message);