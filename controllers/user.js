const { v4: uuidv4 } = require('uuid');
const User= require('../models/user');
const {setUser}=require('../service/auth');
const validator = require('validator');
async function handleUserSignUp(req,res){
    const {name,email,password}= req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter and one digit.' });
    }
    await User.create({
        name,
        email,
        password,
    });
    return res.render("/");
}
async function handleLogin(req,res){
    const {email,password}=req.body;
    const user = await User.findOne({ email,password});
    if(!user) return res.render("login",{
        error:'Invalid Username / Email / Password',
    });
    // const sessionId= uuidv4();
    const token = setUser(user);
    res.cookie('uid',token);
    return res.redirect("/");
}
module.exports={
    handleUserSignUp,
    handleLogin,
}