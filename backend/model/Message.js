const mongoose = require("mongoose");
const Message = new mongoose.Schema({
  Sender: {
    type: String,
    required: true,
  },
  Receiver:{
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