var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var photosModel = require('../models/photosModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

  console.log(req.body)

  /*var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;
  var message = req.body.message;*/

  var photos = await photosModel.getPhotos();

  res.render('index', {
    title: '', 
    message: '',
    photos, 
    phone: ''
  });
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  
  let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASS
      }
  });

  let mailOptions = {
      from:  process.env.SMTP_USER,
      to: email,
      subject: `Nuevo Mensaje del Portafolio de Marian enviado por ${name}`,
      text: message   
  };

  var info = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    res.render('index', {title: '', message: 'Mensaje enviado con éxito' });
    
  });
  
});


module.exports = router;
