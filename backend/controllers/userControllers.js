const asynchandler=require("express-async-handler");
const usermodel=require("../models/userModel");
const generateToken=require("../config/generateToken");

const registeredUser=asynchandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name||!email||!password){
        resizeBy.status(400);
        throw new Error("Please enter all the fields");
    }
    const userexists=await usermodel.findOne({email});
    if(userexists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user= await usermodel.create({
        name,
        email,
        password,
        pic
    });

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)

        });
    }
    else{
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const authuser=asynchandler(async (req,res)=>{
    const { email, password, pic } = req.body;
    const user = await usermodel.findOne({ email });
    if (user && (await user.matchpassword(password))) {
      res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)

        });

    }
    else{
        res.status(401);
        throw new Error("Wrong Email or Password");

    }


});

const allUsers = asynchandler(async(req,res)=>{
    const keyword=req.query.search
    ?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}

        ]
        
    }:{};
    const users= await usermodel.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
   
});

module.exports={registeredUser,authuser,allUsers};