module.exports = function(){
  const route = require('express').Router();
  const db = require('../config/db');

//------------------login------------------
  route.post('/login', function(req, res){
    let userId = req.body.id;
    let userpw = req.body.id;

    let sql = 'SELECT num FROM club_authority WHERE authId = ? AND password = ?;';
    db.get().query(sql, [userId, userpw], function(err, rows){
      if(err) res.sendStatus(460);
      else if(rows.length > 0){
        req.session.userId = userId;
        res.status(201).send('' + rows[0].num);
      } else {
        res.sendStatus(460);
      }
    });
  });

//------------------logout------------------
  route.get('/logout', function (req, res) {
    req.session.destroy(function(err){
      if(err) return next(err);
      req.session;
      res.sendStatus(200);
    });
  });

  return route;
};
