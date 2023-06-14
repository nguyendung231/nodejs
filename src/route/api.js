const express = require('express');
const APIController =  require('../controller/APIController');

let router = express.Router();

const initAPIRoute = (app)  => {
    
    router.get('/users',APIController.getAllUsers);
    router.post('/create-user',APIController.createNewUser);
    router.put('/update-user',APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);



    return app.use('/api/v1/', router)
}

module.exports = initAPIRoute;
