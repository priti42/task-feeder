const {createUser, login, createTask, getTask, updateUserTask, deleteUserTask} = require('.././services/userService'); 

const createUserController = async(req, res) => {
    try {
        const data = await createUser(req, res)
        // res.status(200).json(data);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const loginController = async(req, res) => {
    try {
        const data = await login(req, res)
        // res.status(200).json(data);
        if (req.session.isAuth) {
            // res.setHeader('Authorization', req.token);
            res.redirect('/task-page');
        }else{
            res.redirect('/');
        }
    } catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
}

const logoutController = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

const createTaskController = async (req, res) => {
    try {
        const data = await createTask(req, res);
        res.redirect('/'); 
    } catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
}

const getTaskController = async (req, res) => {
    try {
        const data = await getTask(req, res);
        let totalTasks = data.toJSON();
        totalTasks = totalTasks.Tasks.map(task => {
            task.taskdate = new Date(task.taskdate).toDateString();
            return task;
        })
        res.render('tasks-page/task-list', {
            pageTitle: 'Task-List',
            path: '',
            isAuth: req.session.isAuth,
            tasks: totalTasks,
            userType: req.session.user.type
        })
        // res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
}

const updateUserTaskController = async (req, res) => {
    try {
        const data = await updateUserTask (req, res);
        res.redirect('/'); 
    } catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
}

const deleteUserTaskController = async (req, res) => {
    try {
        const data = await deleteUserTask (req, res);
        res.redirect('/'); 
    } catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
}

module.exports = {
    createUserController,
    loginController,
    logoutController,
    createTaskController,
    getTaskController,
    updateUserTaskController,
    deleteUserTaskController
}