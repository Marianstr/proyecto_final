var express = require('express');
var router = express.Router();
var photosModel = require('../../models/photosModel');

router.get('/', async function(req, res, next) {

  var photos = await photosModel.getPhotos();

  res.render('admin/photos',{
    layout: 'admin/layout',
    usuario: req.session.nombre,
    photos
  });
});

router.get('/delete/:id', async (req, res, next) => {
  var id = req.params.id;
  await photosModel.deletePhotoById(id);
  res.redirect('/admin/photos');
});

router.get('/create', async (req, res, next) => {
  
  res.render('admin/create', {
    layout: 'admin/layout',
  });
} 
);


router.post('/create', async (req, res, next) => {
  if (req.body.name && req.body.name != "" && req.body.dimension != "" && req.body.price != "") {
    await photosModel.insertPhoto(req.body);
    res.redirect('/admin/photos');  
  }
  else {
    res.render('admin/create', {
      layout: 'admin/layout',
      error: true,
      message: 'Todos los campos son requeridos'
    });
  }
  } 
);

router.get('/update/:id', async (req, res, next) => {
  var id = req.params.id;
  var photo = await photosModel.getPhotoById(id);
  res.render('admin/update', {
    layout: 'admin/layout',
    photo: photo[0]
  });
});

router.post('/update', async (req, res, next) => {
  var obj = {
    name: req.body.name,
    dimension: req.body.dimension,
    price: req.body.price 
  }

    await photosModel.updatePhotoById(obj, req.body.id);
    res.redirect('/admin/photos');  
  }
);

module.exports = router;
