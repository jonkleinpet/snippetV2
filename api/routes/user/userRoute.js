const express = require('express');
const { userService } = require('./userService');
const authService = require('../../services/authService');
const { errorHandling } = require('../../helpers/errorHandling');
const bodyParser = express.json();
const userRoute = express.Router();

userRoute
    .route('/register')
    .post(bodyParser, async (req, res, next) => {
        const knex = req.app.get('db');
        const { username, password } = req.body;
        try {

            const message = await errorHandling.checkReqFields(username, password);
            
            if (message) {
                return res.send({message});
            }

        const notValid = await userService.checkUserName(knex, username);
        if (notValid) {
            res.send({ message: 'Username already taken'});
        }

        const hashPassword = await usersService.hashPassword(password);
        
        const user = {
            user_name,
            password: hashPassword
        };

        const newUser = await userService.registerUser(knex, user);
        const sub = newUser.user_name;
        const payload = {
            id: newUser.id
        };
        
        return res.send({ authToken: authService.createJwt(sub, payload) });
        
    }
    catch(error) {
        next(error);
    }
})

userRoute
  .route('/login')
  .post(bodyParser, async (req, res, next) => {
    try {
      const knex = req.app.get('db');
      const { user_name, password } = req.body;
      
      if (!user_name) {
        return res.send({ message: 'user name is missing' });
      }
      if (!password) {
        return res.send({ message: 'password is missing' });
      }

      const dbUser = await usersService.getUser(knex, user_name);
      const validPassword = await authService.comparePasswords(password, dbUser.password);

      if (dbUser.user_name === user_name && validPassword) {
        const sub = dbUser.user_name;
        const payload = {
          id: dbUser.id
        };

        return res.send({ authToken: authService.createJwt(sub, payload) });
      }
      return res.send({ message: 'incorrect user name or password' });
    }

    catch (error) {
      next(error);
    }
  });


module.exports = userRoute;