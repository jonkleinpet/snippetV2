const bcrypt = require('bcryptjs');

const userService = {

    registerUser(db, user) {
        return db
            .insert(user)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    },

    hashPassword(password) {
        return bcrypt.hash(password, 12);
    },

    checkUserName(db, user_name) {
        return db('users')
          .where({ user_name })
          .first()
          .then(user => !!user);
        },
    
      getUser(db, user_name) {
        return db.select('*')
          .from('users')
          .where({ user_name })
          .then(user => user[0]);
        }
}

module.exports = {
    userService
};