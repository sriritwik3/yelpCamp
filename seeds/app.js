const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected")
})

const randomGen = (array) => array[Math.floor(Math.random() * array.length)];
const seedDb = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '607442f0d1428a3ee0925ea8',
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${randomGen(descriptors)} ${randomGen(places)}`,
            image: 'https://source.unsplash.com/collection/190727',
            description: 'Well, I don\'t know what you\'re expecting from me.',
            price: Math.floor(Math.random() * 1000) + 100,
        });
        await camp.save();
    }
};

seedDb().then(() => {
    mongoose.connection.close();
});