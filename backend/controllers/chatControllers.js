const asynchandler=require("express-async-handler");
const chatmodel=require("../models/chatModel");
const userModel = require("../models/userModel");


//acessing one to one chat
const accessChat=asynchandler(async(req,res)=>{
    const {userId}=req.body;
    if (!userId) {
      res.status(400);
      throw new Error("Userid param not sent");
    }
    var isChat = await chatmodel.find({
      isGroupChat:false,
      $and:[
        {users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:userId}}}
      ],
    })
    .populate("users","-password").populate("latestMessage");

    isChat=await userModel.populate(isChat,{
        path:'latestMessage.sender',
        select:"name pic email",
    });

    if(isChat.length>0){
        res.send(isChat[0]);
    }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],

        };
        try{
            const createdchat= await chatmodel.create(chatData);
            const fullchat= await chatmodel.findOne({_id:createdchat.id}).populate("users","-password");
            res.status(200).send(fullchat);
        }
        catch(err){
            res.status(400);
            throw new Error(err.message);
        }

    }
});

const fetchChats = asynchandler(async (req, res) => {
  try {
    chatmodel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asynchandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await chatmodel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await chatmodel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asynchandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await chatmodel.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    },
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asynchandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await chatmodel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    },
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asynchandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await chatmodel.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    },
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});



module.exports = { accessChat, fetchChats, createGroupChat,renameGroup,addToGroup,removeFromGroup };