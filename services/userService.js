const Model = require('../models/index').sequelize.models
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { formCounter } = require('../utils/helpers');

const createUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const userData = await Model.User.create({
            username: username,
            password: hash
        })
        return userData;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`)
    }
}

const login = async(req, res)=>{
    try {
        const { username, password } = req.body;
        const userData = await Model.User.findOne({
            where: {
                username: username
            }
        })
        if(!userData){
            throw new Error(`User ${username} not found`);
        }
        const passwordCheck = bcrypt.compareSync(password, userData.password);
        if(!passwordCheck){
            throw new Error(`User password not correct`);
        }
        const token = await jwt.sign(userData.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        req.session.isAuth = true;
        req.session.user = {
            ...userData.toJSON(),
            token
        };
        req.session.save();
        return {token, userData}
        
    } catch (error) {
        throw new Error(`Error login user: ${error.message}`)
    }
}

const createTask = async(req, res) => {
    try {
       const {taskName, taskDescription, taskDate} = req.body;
       const { user:  { id: userId } } = req.session;
       const formId = await formCounter();
       const taskData = await Model.Task.create({
        taskname: taskName,
        taskdescription: taskDescription,
        taskdate: taskDate,
        userid: userId,
        taskId: formId
       })
       return taskData;
    } catch (error) {
        throw new Error(`Error creating task: ${error.message}`)
    }
}

const getTask = async (req, res) => {
    try {
        const { user:  { id: userId } } = req.session;
        let taskData = await Model.User.findOne({
            where:{
                id: userId
            },
            include: [{ 
                model: Model.Task,
            }]
            
        });
        return taskData;
    } catch (error) {
        throw new Error(`Error creating task: ${error.message}`)
    }
}

const updateUserTask = async(req, res)=> {
    try {
        const {taskName, taskDescription, taskDate, taskId} = req.body;
        const { user:  { id: userId } } = req.session;
        const updatedData = await Model.Task.update({
            taskname: taskName, taskdescription: taskDescription, taskdate: taskDate},
            {
                where: {
                    id: taskId,
                    userid: userId
                }
            })
            return updatedData;
    } catch (error) {
        throw new Error(`Error updating task: ${error.message}`)
    }
}

const deleteUserTask = async(req, res)=>{
    try {
        const { taskId } = req.query;
        const { user:  { id: userId } } = req.session;
        const deleteTask = await Model.Task.destroy({
            where: {
                id: taskId,
                userid: userId
            }
        })
        return deleteTask;
    } catch (error) {
        throw new Error(`Error delete task: ${error.message}`)
    }
}

module.exports ={
    createUser,
    login,
    createTask,
    getTask,
    updateUserTask,
    deleteUserTask
}