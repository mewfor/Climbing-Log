const db = require('../models/climbingModels');

const routesController = {}

routesController.getRoutes = async (req, res, next) => {
    //const { location_id } = req.body;
    const location_id = req.params.location_id;
    const text = 'SELECT routes.id, routes.route_name, routes.difficulty, routes.photo_url, locations.location_name FROM routes LEFT JOIN locations ON routes.location_id = locations.id WHERE location_id=$1';
    const params = [location_id];
    try {
        const result = await db.query(text, params);
        //console.log('result ->', result)
        res.locals.routes = result.rows
        return next()
    }
    catch(err) {
        return next({
            log: `routesController.getRoutes: ERROR: ${err}`,
            message: { err: 'Error occcured in routesController.getRoutes. Check server logs for more details'}
        })
    }
}

module.exports = routesController