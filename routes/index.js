var express = require('express');
const { isAuth } = require('../middleware/isAuth');
var router = express.Router();
const Model = require('../models/index').sequelize.models


/* GET home page. */
router.get('/', isAuth, (req, res) => {
  if(req.session.user.type == "admin" ) {
  res.redirect("/admin/getAllUserDetails")
  } else {
    res.redirect("/task-page")
  }
});

router.get('/signup', (req, res) => {
   res.render('tasks-page/signup', {
       pageTitle: 'Signup',
       path: '/signup',
       isAuth: req.session.isAuth,
       userType: req.session.user ? req.session.user.type : ' '
     });
})

router.get('/login', (req, res) => {
  res.render('tasks-page/login', {
      pageTitle: 'Login',
      path: '/login',
      isAuth: req.session.isAuth,
      userType: req.session.user ? req.session.user.type : ' '
    });
})



router.get('/task-page', isAuth, async(req, res) => {
  const { taskId } = req.query;
  let getDetails = null;
  if(taskId) {
     getDetails = await getTaskDetails(taskId)
  }
  
  res.render('tasks-page/task-form', {
      pageTitle: 'Task Form',
      path: 'task-form',
      isAuth: req.session.isAuth,
      taskname: getDetails ? getDetails.taskname : '',
      taskdescription: getDetails ? getDetails.taskdescription :'',
      taskdate: getDetails ? getDetails.taskdate :'',
      taskId:getDetails ? getDetails.id:'',
      userType: req.session.user ? req.session.user.type : ' '
    });
});

const getTaskDetails = async(taskId) => {
  try {
    const taskDetails = await Model.Task.findOne({ where: { id: taskId } });
    return taskDetails.toJSON();
  } catch (error) {
    throw new Error(error)
  }
}



module.exports = router;
