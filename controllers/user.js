const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function signUp(req, res) {
  const user = new User();


  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las constraseñas son obligatorias." })
  } if (password !== repeatPassword) {
    res.status(404).send({ message: "Las contraseñas tiene que ser iguales." })
  } else {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." })
      } else {
        user.password = hash;

        //guardar en mongo
        user.save((err, userStorage) => {
          if (err) {
            res.status(500).send({ message: "El usuario ya existe." })
          } else {
            if (!userStorage) {
              res.status(404).send({ message: "Error al crear el usuario." })
            } else {
              res.status(200).send({ message: userStorage })
            }
          }
        })
      }
    })
  }

}

module.exports = {
  signUp
}