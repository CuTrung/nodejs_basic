import express from 'express';
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
    app.get('/', homeController.getHomePage);
    app.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    app.get('/about', (req, res) => {
        res.send('Trung đẹp trai');
    });

    return app.use('/', router);
};

export default initWebRoute;

