var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlSims = require('../controllers/sims');
ctrlSession = require('../controllers/session');

//Users
router.post('/login', ctrlUsers.login);
router.get('/logout', ctrlUsers.logout);
router.post('/user', ctrlUsers.getByUserName);
router.post('/users', ctrlUsers.addUser);
//router.get('/users/:userid', ctrlUsers.usersGetByIdOne);
//router.put('/users/:userid', ctrlUsers.usersUpdateOne);
//router.delete('/users/:userid', ctrlUsers.usersDeleteOne);

// SIMs
//router.get('/sims', ctrlSims.simsListById);
router.post('/sims', ctrlSims.orderSIM);
//router.get('/sims', ctrlSims.getAllSIMs);
//router.get('/sims/:simsid', ctrlSims.simsGetByIdOne);
//router.put('/sims/:simsid', ctrlSims.simsUpdateOne);
//router.delete('/sims/:simsid', ctrlSims.simsDeleteOne);

router.post('/session', ctrlSession.setCurrentUser);
router.get('/session', ctrlSession.getCurrentUser);
module.exports = router;
