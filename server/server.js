const express = require('express');
const path = require ('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());


app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
})

app.get('*', (req, res) => {
    return res.status(404)
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