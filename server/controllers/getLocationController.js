const db = require('../models/climbingModels');

const getLocationController = {};

getLocationController.getLocations = async (req, res, next) => {
    const text = 'SELECT * FROM "public"."locations"'

    try {
        const result = await db.query(text)
        console.log('result ->', result)
        res.locals.locations = result.rows
        return next()
    }
    catch(err) {
        next({
            log: `getLocationController.getLocations: ERROR: ${err}`,
            message: { err: 'Error occcured in getLocationsController.getLocations. Check server logs for more details'}
          })
    }
}


module.exports = getLocationController