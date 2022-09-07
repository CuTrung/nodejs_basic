import express from 'express';
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
    app.get('/', homeController.getHomePage);
    app.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);
    app.get('/about', (req, res) => {
        res.send('Trung đẹp trai');
    });

    return app.use('/', router);
};

export default initWebRoute;

