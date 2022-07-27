const express = require('express');
const experiencesController = require('../controllers/experiencesController');

const experienceRouter = express.Router()

experienceRouter.get('/:user_id-:route_id', experiencesController.getExperiences, (req, res) => {
    return res.status(200).json(res.locals.experiences);
})

experienceRouter.post('/', experiencesController.createExperience, experiencesController.getExperiences, (req, res) => {
    return res.status(200).json(res.locals.experiences)
})
    

experienceRouter.delete('/', experiencesController.deleteExperience, (req, res) => {
    return res.status(200).json(res.locals.deleted)
})

experienceRouter.patch('/', experiencesController.updateExperience, (req, res) => {
    return res.status(200).json(res.locals.updated)
})


module.exports = experienceRouter