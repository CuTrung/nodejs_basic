import express from 'express';
import conFigViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB';

require('dotenv').config();
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8081;

app.use(morgan('combined'));


// Cấu hình express parse data phức tạp từ request thành json
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

// setup view engine
conFigViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs');
})


app.listen(port, () => {
    console.log("Run project");
})




