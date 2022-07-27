const db = require('../models/climbingModels');

const experiencesController = {};

experiencesController.getExperiences = async (req, res, next) => {
  //user_id and route_id expected
  console.log('get exp invoked')
    let user_id = req.params.user_id
    let route_id = req.params.route_id
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
    const { attempted_top_rope, attempted_lead, completed_top_rope, completed_lead, completed_cleanly, route_id, user_id, notes } =  req.body;
    const values = [attempted_top_rope, attempted_lead, completed_top_rope, completed_lead, completed_cleanly, route_id, user_id, notes];
    try {
        const text = `INSERT INTO "public"."experience"("attempted_top_rope", "attempted_lead", "completed_top_rope", "completed_lead", "completed_cleanly", "route_id", "user_id", "notes") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id", "attempted_top_rope", "attempted_lead", "completed_top_rope", "completed_lead", "completed_cleanly", "route_id", "user_id", "date_created", "date_modified", "notes"`;

        const result = await db.query(text, values)
        // need to make sure that we are returning the newly created row
        console.log('result -> ', result.rows)
        res.locals.newExperience = result.rows
        return next();
    }
    catch (err) {
        next({
            log: `experiencesController.createExperience: ERROR: ${err}`,
            message: { err: 'Error occcured in experiencesController.createExperience. Check server logs for more details'}
          })
    }

}


experiencesController.deleteExperience = async (req, res, next) => {
    const { id } = req.body
    const text = 'DELETE FROM experience WHERE id=$1'
    const values = [id]
    try {
      const result = await db.query(text, values)
      console.log('result -> ', result)
      res.locals.deleted = result
      return next()
    }
    catch (err) {
        next({
            log: `experiencesController.deleteExperience: ERROR: ${err}`,
            message: { err: 'Error occcured in experiencesController.deleteExperience. Check server logs for more details'}
          })
    }
}

experiencesController.updateExperience = async (req, res, next) => {
    const { attempted_top_rope, attempted_lead, completed_top_rope, completed_lead, completed_cleanly, id, notes } =  req.body
    const text = `UPDATE "public"."experience" SET "attempted_top_rope"=$1, "attempted_lead"=$2, "completed_top_rope"=$3, "completed_lead"=$4, "completed_cleanly"=$5, "notes"=$6 WHERE id = $7`
    const values = [attempted_top_rope, attempted_lead, completed_top_rope, completed_lead, completed_cleanly, notes, id];
    try{
        const result = await db.query(text, values)
        //missing res.locals
        console.log('result -> ', result)
        res.locals.updated = result
        return next();
    }
    catch(err){
        next({
            log: `experiencesController.updateExperience: ERROR: ${err}`,
            message: { err: 'Error occcured in experiencesController.updateExperience. Check server logs for more details'}
          })
    }

}


module.exports = experiencesController
