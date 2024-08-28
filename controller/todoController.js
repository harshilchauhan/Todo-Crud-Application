const todoModel = require('../models/todoModel')
const userModel = require('../models/userModel')
const {jwtAuthMiddleware, generateToken} = require('../middleware/jwtAuth');

const registerUser = async(req,res)=>{
    try {
        const data = req.body;
        const adminUser = await userModel.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }
        const existingUser = await userModel.findOne({ username: data.username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }
        const newUser = new userModel(data);
        const response = await newUser.save();
        console.log(response);
        res.status(200).json({response:response});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "insertnal server error" });
    }
}

const loginUser = async(req,res)=>{
    try {
        const {username,password} = req.body
        const user = await userModel.findOne({username:username})
        console.log(user);
        
        if(!user)
        { 
          res.status(401).json({error:"invalid username"})
        }
        const payload = {
          id:user.id,
        }
        const token = generateToken(payload)
        res.json({token:token})
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "insertnal server error" });
      }
}

const checkAdminRole = async (userId)=>{
    try {
        const user = await userModel.findById(userId)
        if(user.role === 'admin'){
            return true;
        }
    } catch (error) {
        return false;
    }
}
const saveTodoItem = async(req,res)=>{
    try {
        if(!checkAdminRole(req.userPayLoad.id))
            {
                return res.status(404).json({message:'user is not admin role'})
            }
        const {title,description} = req.body;
        const createdBy = req.userPayLoad.id
            console.log(createdBy)
    const response = await todoModel.create({title,description,createdBy})
    console.log(response);
    res.status(200).json({response:response});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "insertnal server error" });
    }
}

const updateTodoItem = async(req,res)=>{
    try {
        if(!checkAdminRole(req.userPayLoad.id))
            {
                return res.status(404).json({message:'user is not admin role'})
            }
        const userId=req.params.id
        const updatedata = req.body
        const response = await todoModel.findByIdAndUpdate(userId,updatedata)
        console.log('data updated');
        res.status(200).json({message:'data updated'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "insertnal server error" });
    }
}

const deleteTodoItem = async(req,res)=>{
    try {
        if(!checkAdminRole(req.userPayLoad.id))
            {
                return res.status(404).json({message:'user is not admin role'})
            }
        const userid = req.params.id
        const response = await todoModel.findByIdAndDelete(userid)
        res.status(200).json({message:'data deleted'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "insertnal server error" });
    }
}

const getAllTodoItem = async(req,res)=>{
    try {
        const response = await todoModel.find()
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "insertnal server error" });
    }
}

module.exports={
    registerUser,
    loginUser,
    saveTodoItem,
    updateTodoItem,
    deleteTodoItem,
    getAllTodoItem
}