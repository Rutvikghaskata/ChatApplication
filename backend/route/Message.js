const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../model/Message");

const Messages = mongoose.model("Messages");

router.post("/message", async (req, res) => {
  console.log(req.body)
  const { Sender, Receiver, Message, Reaction } = req.body;
  try {
    const message = new Messages({
      Sender,
      Receiver,
      Message,
      Reaction,
    });
    message.save();
    res.status(200).send({ success: true });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/getMessages", (req, res) => {
  Messages.find().then((data) => {
    res.status(200).json(data);
  });
});

router.put("/message/:id", async (req, res) => {
  const id = req.params.id;
  const user = "vishal";
  const react = "cry";
  console.log(user, react);
  // const result = await Messages.findById(id);
  const query = { _id: id, "Reaction.user": `${user}` };
  const updateDocument = {
    $set: { "Reaction.$.user": user, "Reaction.$.react": react },
  };
  const result = await Messages.findOne(query);
  // const options = { upsert: true };
  // const result = await Messages.findOneAndUpdate(query,updateDocument,options)
  if (result) {
    const message = await Messages.findOneAndUpdate(query, updateDocument);
    res.status(200).json({ res: message, status: 200 });
  } else {
    const message = await Messages.updateOne(
      { _id: id },
      { $push: { Reaction: { user: user, react: react } } }
    );
    res.status(200).json({ result: message, status: 200 });
  }
});
module.exports = router;
