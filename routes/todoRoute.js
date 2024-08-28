const express = require('express');
const router = express.Router();
const body_parser=require('body-parser')
router.use(body_parser.json())
const {jwtAuthMiddleware, generateToken} = require('../middleware/jwtAuth');
const todo_controller=require('../controller/todoController')

router.post('/signup',todo_controller.registerUser)
router.post('/login',todo_controller.loginUser)
router.post('/save',jwtAuthMiddleware,todo_controller.saveTodoItem)
router.put('/update/:id',jwtAuthMiddleware,todo_controller.updateTodoItem)
router.delete('/del/:id',jwtAuthMiddleware,todo_controller.deleteTodoItem)
router.get('/get',todo_controller.getAllTodoItem)

module.exports= router