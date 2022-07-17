const Model = require('../models/index').sequelize.models

const getAllUserDetails =async (req, res) => {
    try {
        const allUsers = await Model.User.findAndCountAll({
            where: {
                type: "user"
            },
            include: [{
                model: Model.Task
            }]
        })
        return allUsers;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`)
    }
}

module.exports= {
    getAllUserDetails,
}