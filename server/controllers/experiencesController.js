const db = require('../models/climbingModels');

const experiencesController = {};

experiencesController.getExperiences = async (req, res, next) => {
  //user_id and route_id expected
  console.log('get exp invoked')
    user_id = req.params.user_id
    route_id = req.params.route_id
  const values = [user_id, route_id];
  try {
    const text = 'SELECT * FROM "public"."experience" WHERE user_id=$1 AND route_id=$2'
    const result = await db.query(text, values);
    console.log('result-->', result)
    res.locals.experiences = result.rows;
    next();
  }
  catch(err) {
      next({
        log: `experiencesController.getExperiences: ERROR: ${err}`,
        message: { err: 'Error occcured in experiencesController.getExperiences. Check server logs for more details'}
      })
  }
}

experiencesController.createExperience = async (req, res, next) => {
    const { route, user_id } =  req.body
    const values = [route, user_id]
    const text = 'INSERT INTO experience (route_id, user_id) VALUES($1, $2)'
    //INSERT INTO "public"."experience"("attempted_top_rope", "attempted_lead", "completed_top_rope", "completed_lead", "completed_cleanly", "route_id", "user_id", "notes") VALUES(2, 2, 2, 2, 2, 1, 2, 'again!') RETURNING "id", "attempted_top_rope", "attempted_lead", "completed_top_rope", "completed_lead", "completed_cleanly", "route_id", "user_id", "date_created", "date_modified", "notes";
    const result = await db.query(text, values)

    console.log('result -> ', result)
    res.locals.newExperience = result.rows

    return next()

}
module.exports = experiencesController
