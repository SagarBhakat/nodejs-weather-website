const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Sagar Bhakat'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Sagar Bhakat',
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {

        res.render('help', {
            msg: 'Need Help ?',
            name: 'Sagar Bhakat',
            title: 'HELP'
        })
    })
    // app.get('', (req, res) => {
    //     res.send("<h1>Hello Sagar Bhakat</h1>")
    // })


// const aboutPagepath = path.join(__dirname, '../public/about.html')

// app.use(express.static(aboutPagepath));


// app.get('/help', (req, res) => {
//     res.send("<h2>This is the Help Page!</h2>");

// })

// app.get('/about', (req, res) => {
//     res.send("<h3>This is the About Page!</h3>")
// })

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }


    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        };
        // console.log(latitude, longitude, location)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })

    // send({
    //     forcast: '28 degrees',
    //     location: address,

    // })
    // console.log(req.query.address)
})



app.get('/products', (req, res) => {
    res.send({
        products: []
    })
    console.log(req.query.search)
})


app.get('*', (req, res) => {
    res.render('404', {
        name: 'Sagar Bhakat',
        title: '404'
    })

})


//app.com --> root route
//app.com/help --> help route
//app.com/about --> about route


app.listen(port, () => {
    console.log("Server is up on port " + port);
})