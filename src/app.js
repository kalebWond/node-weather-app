const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Setup handleabar's engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory)

//  Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kaleb Wondwossen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        about: 'about the author coming soon',
        name: 'Kaleb Wondwossen'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'You need some help?',
        name: 'Kaleb Wondwossen'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Kaleb Wondwossen'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You have to provide address'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error) {
           return res.send({error})
        }
        
        forcast(latitude, longitude, (error, forcast) => {
            if(error) {
                return res.send({error})
            }

            res.send({forcast, location, address})
        })
    })

    // res.send({
    //     forcast: {
    //         temperature: '20',
    //         type: 'cloudy with a chance of meatball'
    //     },
    //     address: req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        name: 'Kaleb Wondwossen'
    })
})

app.listen(port, () => {
    console.log('server running on port ' + port)
})