const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const request = require('request')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = 3000;
const pathDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials');
app.use(express.static(pathDirectory))
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Sachin Pandey',
        
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'sachin pandey'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'some helpfull text',
        title: 'Help',
        name:'sachin pandey'
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You must provide address')
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                res.send({error})
            }
            console.log(forecastdata);
            res.send({
                location: location,
                address:req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'sachin pandey',
        errorMessage:'Help Article not found'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'sachin pandey',
        errorMessage:'page not found'
    })
})
app.listen(port, () => {
    console.log(`server is up and running at port ${port}`)
})