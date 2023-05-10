const Contact = require('../model/contact');

const { validationResult } = require('express-validator');
 
const addRequest = (request, response) => {
    let reason1 = request.body.reason;
    let name1 = request.body.name;
    let email1 = request.body.email;
    let message1 = request.body.message;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    const contact = new Contact({ reason: reason1, name: name1, email: email1, message: message1});
    contact.save()
        .then((data) => {
            console.log(`Contact saved to database: id -> ${data._id}`);
            response.redirect('/');
        })
        .catch((err) => { console.log(err) });
};

module.exports = {
    addRequest: addRequest
  };