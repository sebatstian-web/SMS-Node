// const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { sendMessage } = require('../twilio/send-sms');
const SMS = require('../models/sms');
const { getSocket } = require('../sockets');

const indexController = async (req, res) => {
  const messages = await SMS.find()
    .sort('-createdAt')
    .lean();
  res.render('index', { messages });
};

const sendSmsController = async (req, res) => {
  const { message, phone } = req.body;

  if (!message || !phone) {
    return res.json({
      ok: false,
      message: 'Se esperaba un mensaje o un teléfono'
    });
  }

  await sendMessage(message, phone);
  await SMS.create({
    body: message,
    to: phone
  });

  res.redirect('/');
};

const receiveSmsController = async (req, res) => {
  // Generar una auto-respuesta al recibir sms
  // const twiml = new MessagingResponse();
  // twiml.message('Respuesta recibida');
  // res.send(twiml.toString());

  const { Body, From } = req.body;
  const saveSms = await SMS.create({
    body: Body,
    from: From
  });

  getSocket().emit('new message', saveSms);

  res.json({
    ok: true,
    message: 'SMS recibido'
  });
};

module.exports = { indexController, sendSmsController, receiveSmsController };
