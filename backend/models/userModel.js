const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
},
{
    timestamps:true,
}
);

userSchema.methods.matchpassword=async function(enteredpassword){
    return bcrypt.compare(enteredpassword,this.password);

}

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});


module.exports=mongoose.model("User",userSchema);