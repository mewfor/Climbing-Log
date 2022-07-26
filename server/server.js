const express = require('express');
const path = require ('path');
const authRouter = require('./routes/authRoutes');
const experienceRouter = require('./routes/experiencesRoutes');
const getLocationController = require('./controllers/getLocationController');
const routesController = require('./controllers/routesController')


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', authRouter)
app.use('/experiences', experienceRouter)



app.use('/getLocations', getLocationController.getLocations, (req, res) => {
    return res.status(200).json(res.locals.locations);
})

app.use('/routes', routesController.getRoutes, (req, res) => {
    return res.status(200).json(res.locals.routes)
})


app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
})

// GET request to get locations
    // Res = array of objects

// GET request to get routes
    // Res = array of objects

app.get('*', (req, res) => {
    res.sendStatus(404)

})


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },  
  };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});