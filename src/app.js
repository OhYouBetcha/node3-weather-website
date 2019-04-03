//Core modules
const path = require('path')
const express = require('express');
const hbs = require('hbs', );

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;



// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//homepage
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Benjamin Petersen"
    })
})

//About Page
app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Me",
        name: 'Benjamin Petersen'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        message: "Here is a help message",
        title: "Help",
        name: "Benjamin Petersen"
    })
})

//Weather Page
app.get('/weather', (req, res) => {
    if (!req.query.address){
         return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send ({
            forecast: forecastData,
            location,
            address: req.query.address
        })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else{
    console.log(req.query.search)
    res.send({
        products: []
    }) 
}
})

//Any links with /help/anything-else 404 not found
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Benjamin Petersen",
        errorMessage: "Help article not found."
    })
})

// Handle all "Cannot find page" 404 routes
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: "Benjamin Petersen",
        errorMessage: "Page not found."
    })
})

//Starts up server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
