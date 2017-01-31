var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlSims = require('../controllers/sims');
var ctrlSession = require('../controllers/session');
var ctrlProfile = require('../controllers/service_profile');
var ctrlTransactions = require('../controllers/transactions');
var ctrlTriggers = require('../controllers/triggers');

//Users
router.post('/login', ctrlUsers.login);
router.get('/logout', ctrlUsers.logout);
router.post('/user', ctrlUsers.getByUserName);
router.post('/users', ctrlUsers.addUser);
//router.get('/users/:userid', ctrlUsers.usersGetByIdOne);
//router.put('/users/:userid', ctrlUsers.usersUpdateOne);
//router.delete('/users/:userid', ctrlUsers.usersDeleteOne);

// SIMs
router.get('/sims', ctrlSims.getAllSIMs);
router.post('/sims', ctrlSims.orderSIM);
router.post('/terminate_sim', ctrlSims.terminateSIM);
router.post('/activate_sim', ctrlSims.activateSIM);
router.post('/change_service_profile', ctrlSims.changeProfile);
router.get('/sims_profiles', ctrlSims.getSIMsWithProfiles);
router.post('/send_sms', ctrlSims.sendSMS);
router.get('/number_sims_with_profiles', ctrlSims.getNumberSIMsWithSP);
//router.get('/sims/:simsid', ctrlSims.simsGetByIdOne);
//router.put('/sims/:simsid', ctrlSims.simsUpdateOne);
//router.delete('/sims/:simsid', ctrlSims.simsDeleteOne);

router.post('/session', ctrlSession.setCurrentUser);
router.get('/session', ctrlSession.getCurrentUser);

//service profiles
router.post('/add_service_profile', ctrlProfile.addNewProfile );
router.post('/get_profiles', ctrlProfile.getAllProfiles );

//transactions
router.get('/transactions', ctrlTransactions.getAllTransactions);

//triggers
router.post('/create_trigger', ctrlTriggers.addTrigger);
router.get('/triggers', ctrlTriggers.getAllTriggers);
router.post('/deactivate_triggers', ctrlTriggers.deactivateTrigger);
module.exports = router;
