const users=require('../models/client.model');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

//Devuelve un usuario segun su nombre de usuario(recibe username="nombre de usuario" en params)
async function getUser(username) {
    return await users.getClientByUserName(username);
}
//Inicia la sesion de un usuario recibiendo los datos del post (username,password)
async function login(req){
    const data=req.body
   if(await users.existUser(data.username)){
    const us=await users.getUserByUserName(data.username)
    const upass=us.password
    const pass=data.password
    if( await users.isPsswCorrect(pass,upass)) {
        var token = jwt.sign({ id: req.body.username }, config.secret, {
            expiresIn:60  // 24 hours 86400
          });
         const user={
             foto:us.foto,
             usuario:us.user,
             nombre:us.nombre,
             apellidos:us.apellido1+" "+ us.apellido2,
             ujwt:token,
             rol:us.role
          }
          return user;
    }
    else{return "Usuario o contrasenia incorrectos"}
   }
   else{return "Usuario o contrasenia incorrectos"}   
}
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      //req.username = decoded.id;
      next();
    });
  };
  module.exports = {
    getUser,login,verifyToken
};