const Donation = require('../model/donation');

const { validationResult } = require('express-validator');

// Open web pages routes
const donationForm = (request, response) => {
   response.render('donate', { title: 'Donate' });
}

const addDonation = (request, response) => {
    let selectedCharity1 = request.body.selectedCharity;
    let itemType1 = JSON.stringify(request.body.itemType);
    let itemDescription1 = JSON.stringify(request.body.itemDescription);
    let deliveryPreference1 = request.body.deliveryPreference;
    let date1 = request.body.date;
    let time1 = request.body.time;
    let address1 = request.body.address;


    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    const donation = new Donation({ itemType: itemType1, itemDescription: itemDescription1, deliveryPreference: deliveryPreference1, date: date1, time: time1, address: address1, selectedCharity: selectedCharity1});
    donation.save()
        .then((data) => {
            console.log(`Donation order saved to database: id -> ${data._id}`);
            //redirects to the success page
            response.redirect('/success');
        })
        .catch((err) => { console.log(err) });
};

module.exports = {
    addDonation: addDonation
  };