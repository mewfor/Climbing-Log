const db = require('../models/climbingModels');

const authController = {}

authController.login = async (req, res, next) => {
  //expecting a user_name and password
  const { user_name, password } = req.body;
  //console.log('req.body.user_name-->', )
  try{
    const params = [user_name, password];
    const text = 'SELECT * FROM "public"."users" WHERE user_name=$1 AND password=$2'
    const result = await db.query(text, params);
    console.log(result);
    if(result.rows.length > 0) res.locals.user = result.rows[0].id;
    else res.send('login failed');
    next();
  }
  catch (err) {
    next({
        log: `authController.login: ERROR: ${err}`,
        message: { err: 'Error occcured in authController.login. Check server logs for more details'}
      })
  }
}

authController.signUp = async (req, res, next) => {

  try{

    next();
  }
  catch (err) {
    next({
        log: `authController.signUp: ERROR: ${err}`,
        message: { err: 'Error occcured in authController.signUp. Check server logs for more details'}
      })
  }
}

module.exports = authController