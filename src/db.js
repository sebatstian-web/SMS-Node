const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/smsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conexión a base de datos'))
  .catch(console.log);
