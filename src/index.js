const express = require('express');
const configViewEngine =  require('./configs/viewEngine')
const initWebRoute =  require('./route/web');
// const connection =  require('./configs/connectDB');
const initAPIRoute =  require('./route/api');


require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);



app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`)
})