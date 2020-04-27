const { Router } = require('express');
const router = Router();
const {
  indexController,
  sendSmsController,
  receiveSmsController
} = require('../controllers/index.controller');

router.get('/', indexController);
router.post('/send-sms', sendSmsController);
router.post('/sms', receiveSmsController);

module.exports = router;
