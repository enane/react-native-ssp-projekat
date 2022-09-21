const express = require("express")
const router = express.Router()

const apicalls = require('./apicalls')

router.route('/getAllHotels').get(apicalls.getAllHotels);
router.route('/getAllLicences').get(apicalls.getAllLicences);
router.route('/addLicence').post(apicalls.addLicence);
router.route('/deleteLicence').post(apicalls.deleteLicence);
router.route('/updateLicence').post(apicalls.updateLicence);
router.route('/addHotel').post(apicalls.addHotel);
router.route('/deleteHotel').post(apicalls.deleteHotel);
router.route('/updateHotel').post(apicalls.updateHotel);
module.exports =router