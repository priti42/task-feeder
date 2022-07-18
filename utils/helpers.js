
const Model = require('../models/index').sequelize.models
const cron = require('node-cron')
const { Op } = require('sequelize')
const formCounter = async() => {
    let counter = await Model.FormCounter.findOne({ where: {id: 1} });
    if(counter) {
        const formCount = `${new Date().toISOString().split('T')[0].split("-").join("")}_${counter.incrementer < 10 ? "0"+(counter.incrementer+1) : counter.incrementer + 1}`
        counter = await Model.FormCounter.update({formId: formCount, incrementer: counter.incrementer + 1}, {where:{id:1}}, { returning: true});
        counter = await Model.FormCounter.findOne({ where: {id: 1} });
    } else {
        const formCount = `${new Date().toISOString().split('T')[0].split("-").join("")}_01`
        counter = await Model.FormCounter.create( {formId: formCount , incrementer: 1 })
    }
    return counter.formId;
}

const deleteOldTaskCron = () => {
    cron.schedule('1 * * * *', () => {
        Model.Task.destroy({
            where: {
                taskdate: {
                    [Op.lt]: new Date()
                }
            }
        })
    })
}



module.exports = {
formCounter: formCounter,
deleteOldTaskCron: deleteOldTaskCron
}