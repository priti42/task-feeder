var express = require('express');
const { getAllUserDetailsController } = require('../controller/adminController');
const { isAdmin, isAuth } = require('../middleware/isAuth');
const { GET_ALL_USER_DETAILS } = require('../utils/constants/routeConstants');

var router = express.Router();


/* GET users listing. */
router.get(GET_ALL_USER_DETAILS, isAuth, isAdmin, getAllUserDetailsController);

module.exports = router;
