module.exports = (app)=> {
   var userHandlers = require('../controllers/userController.js');
   // todoList Routes
   app.route('/tasks')
       .post(userHandlers.loginRequired, userHandlers.profile);
   app.route('/register')
       .post(userHandlers.register);
  app.route('/sign_in')
       .post(userHandlers.sign_in);
};