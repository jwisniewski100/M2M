var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlSims = require('../controllers/sims');
var ctrlSession = require('../controllers/session');
var ctrlProfile = require('../controllers/service_profile');

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
router.post('/terminate_sim', ctrlSims.terminateSIM);
router.post('/activate_sim', ctrlSims.activateSIM);
//router.get('/sims/:simsid', ctrlSims.simsGetByIdOne);
//router.put('/sims/:simsid', ctrlSims.simsUpdateOne);
//router.delete('/sims/:simsid', ctrlSims.simsDeleteOne);

router.post('/session', ctrlSession.setCurrentUser);
router.get('/session', ctrlSession.getCurrentUser);

//service profiles
router.post('/add_service_profile', ctrlProfile.addNewProfile );

module.exports = router;
