const { getAllUserDetails } = require("../services/adminService");

const getAllUserDetailsController = async (req, res)=>{
    try {
        const data = await getAllUserDetails (req, res);
        // res.json(data)
        res.render('tasks-page/all-users-tasks', {
            pageTitle: 'User Details',
            path: '',
            isAuth: req.session.isAuth,
            userType: req.session.user.type,
            users: data.rows
          });
        // res.redirect('/'); 
    } catch (error) {
        res.status(500).json({message: error.message, error: error});
    }
} 

module.exports = {
    getAllUserDetailsController
}