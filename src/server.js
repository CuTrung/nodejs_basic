import express from 'express';
import conFigViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8081;

// Cấu hình express gửi thông tin lên server
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

// setup view engine
conFigViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

app.listen(port, () => {
    console.log("Run project");
})




