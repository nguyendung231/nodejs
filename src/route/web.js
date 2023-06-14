const express = require('express');
const homeController =  require('../controller/homeController');
let router = express.Router();

const initWebRoute = (app)  => {
    
    router.get('/',homeController.getHomepage);
    router.get('/detail/user/:userId',homeController.getDetailPage);
    router.post('/create-new-user',homeController.createNewUser);
    router.post('/delete-user',homeController.deleteUser);
    router.get('/edit-user/:id',homeController.getEditPage);
    router.post('/update-user',homeController.postUpdateUser);

    return app.use('/', router)
}

module.exports = initWebRoute;
