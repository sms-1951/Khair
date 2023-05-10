// importing modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
//importing routers
const donationRouter = require('./routes/donationRoute');
const authRoutes = require('./routes/authRoutes');
const contactRouter = require('./routes/contactRoute');
const reviewRouter = require('./routes/reviewRoute');
const accountRouter = require('./routes/accountRoute');
const Review = require('./model/review');

const {isAuth} = require("./middleware/isAuth")
require('dotenv').config();

//express app
const app = express();
//views
app.set('view engine', 'ejs');
app.use(express.static('public'));

//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let sessionStore = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: 'mySessions'
});
// Catch errors
sessionStore.on('error', function(error) {
    console.log(error);
  });
app.use(session({
    secret: 'mysecret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    resave: true,
    saveUnintialized: true,
    store: sessionStore
}))

//mongodb connection
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log("Connected to Khair database...");
        app.listen(process.env.port, 'localhost', () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (request, response) => {
    response.render('home', { title: 'Home' });
});
app.get('/donate', isAuth,  (request, response) => {
    response.render('donate', { title: 'Donate' });
});
app.get('/charities', isAuth, (request, response) => {
  response.render('charities', { title: 'Charities'});
});
app.get('/success',  (request, response) => {
    response.render('success', { title: 'Successful Donation'});
});
app.get('/login', (request, response) => {
    response.render('login', { title: 'Donate'});
});
app.get('/account', isAuth, (request, response) => {
    const userData = request.session.user;
    response.render('account' ,{ title: 'Account', userData: userData });
});
app.get('/signup', (request, response) => {
    response.render('signup', { title: 'Sign Up' });
});
app.get('/review', isAuth, async (request, response) => {
    const reviews = await Review.find();
    response.render('review' ,{ title: 'Review', reviews: reviews });
});

app.get('/reviewForm', isAuth, (request, response) => {
    response.render('reviewForm', { title: 'New Review' });
});
app.get('/contact', (request, response) => {
    response.render('contact', { title: 'Contact Us' });
});
app.get('/accessDenied', (request, response) => {
    response.render('accessDenied', { title: 'Access Denied' });
});
app.get('/changeSuccess', (request, response) => {
    response.render('changeSuccess', { title: 'Changes Saved' });
});
//using routes respectively
app.use('/donate', donationRouter);
 
app.use('/login',authRoutes);

app.use('/signup',authRoutes);

app.use('/contact',contactRouter);

app.use('/',authRoutes);

app.use('/review', reviewRouter);

app.use('/account', accountRouter);

app.use((request, response) => {
  response.status(404).render('404error', { title: 'Error' });
});
