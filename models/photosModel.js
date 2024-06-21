var pool = require('./bd');

async function getPhotos() {
    try {
        var query = "select * from photos";
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
    console.log(error);
    }
  }

  async function deletePhotoById(id) {
    try {
        var query = "delete from photos where id = ?";
        var rows    = await pool.query(query, [id]);    
        return rows;
    }
    catch(error){
        console.log(error);
    }
}

async function insertPhoto(obj) {
    try {
        var query = "insert into photos set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getPhotoById(id) {
    try {
        var query = "select * from photos where id = ?";
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function updatePhotoById(obj, id) {
    try {
        var query = "update photos set ? where id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { getPhotos, deletePhotoById, insertPhoto, getPhotoById, updatePhotoById };