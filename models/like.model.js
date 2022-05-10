const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        idEvent: String,
        emailcampeur: String,
        like: Boolean
    },
    {
      timestamps: true,
    }
  );  

  const Like = mongoose.model("Like", likeSchema);
  
  module.exports = { Like };