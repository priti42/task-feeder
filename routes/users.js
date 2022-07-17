var express = require('express');
const { createUserController, loginController, logoutController, createTaskController, getTaskController,
  updateUserTaskController, deleteUserTaskController } = require('../controller/userController');
const { isAuth } = require('../middleware/isAuth');
const { SIGNUP_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, CREATE_TASK_ROUTE, GET_USER_TASK, UPDATE_USER_TASK, DELETE_USER_TASK } = require('../utils/constants/routeConstants');
var router = express.Router();


/* GET users listing. */
router.post(SIGNUP_ROUTE, createUserController);

router.post(LOGIN_ROUTE, loginController);

router.get(LOGOUT_ROUTE, logoutController);

router.post(CREATE_TASK_ROUTE, isAuth, createTaskController);

router.get(GET_USER_TASK, isAuth, getTaskController);

router.post(UPDATE_USER_TASK, isAuth, updateUserTaskController);

router.get(DELETE_USER_TASK, isAuth, deleteUserTaskController);



module.exports = router;
