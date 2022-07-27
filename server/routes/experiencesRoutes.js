const express = require('express');
const experiencesController = require('../controllers/experiencesController');

const experienceRouter = express.Router()





experienceRouter.get('/:user_id-:route_id', experiencesController.getExperiences, (req, res) => {
    return res.status(200).json(res.locals.experiences);
});

// GET request for experiences
    // return all experiences

// POST request for expereinces
    // return new experience

experienceRouter.post('/', experiencesController.createExperience, (req, res) => {
    return res.status(200).json(res.locals.newExpereince)
})
    

// DELETE request for expereinces
    // return success
    

// UPDATE request for experiences
    // return success

module.exports = experienceRouter