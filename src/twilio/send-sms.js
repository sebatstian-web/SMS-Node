const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);

// Documentación JS
/**
 * Enviar un sms utilizando Twilio
 * @param {string} body - Cuerpo del mensaje a enviar
 * @param {string} phone - Número de teléfono
 */

async function sendMessage(body, phone) {
  try {
    const message = await client.messages.create({
      to: phone,
      from: config.phoneTwilio,
      body
    });
    return message;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMessage };
