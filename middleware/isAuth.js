const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    const sessionObj = req.session;
    if(sessionObj.user){
        const decoded = jwt.verify(sessionObj.user.token, process.env.JWT_SECRET_KEY);
        if(decoded){
            next();
        }else{
            res.redirect('/login');
        }   
    } else {
        res.redirect('/login');
    }
}

const isAdmin = async(req, res, next) =>{
    const sessionObj = req.session;
    if(sessionObj.user){
        if(sessionObj.user.type === 'admin'){
            next();
        }else{
            res.redirect('/login');
        }   
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    isAuth,
    isAdmin
}