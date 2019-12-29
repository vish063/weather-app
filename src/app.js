const path = require('path');

const express = require('express');
const hbs = require('hbs');

const {darkSky, geocode} = require('./utils/utils');
const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(process.cwd(), '/src/templates/views');
const partialsPath = path.join(process.cwd(), '/src/templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDir));
app.get('', (req, res) => {
  //  res.send('<h1>Hello world! Long way to go</h1>')
    res.render('index' , {
        content : 'This is hbs templating engine',
        name : 'Vishnu',
        date : new Date()
    });
});
app.get('/home', (req, res) => {
   res.send('You are in home page now!');
});

app.get('/about', (req, res) => {
   // res.send('You are in about page now!');
    res.render('about', {
        name: 'Vishnu',
        age : 28,
        date : new Date()
    });
});

app.get('/weather', async (req, resp) => {
    let mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?access_token=pk.eyJ1IjoidmlzaG51LWIiLCJhIjoiY2szemRsbDJ0MXJycDNrcGRrY2xtejFsMCJ9.XTVP10fVD2a00yNLkDAncQ&limit=1';
    const url = 'https://api.darksky.net/forecast/4d98b23bdc7e9f835bc95fdaa769a42a';

    if(!req.query.address) {
        return resp.send('You must provide address');
    }
    const location = req.query.address;
    mapBoxUrl = mapBoxUrl.replace('{location}', encodeURIComponent(location));
    console.log(`map box url - ${mapBoxUrl}`);
    try {
        const locationDetails =  geocode(mapBoxUrl, (error, locationDetails) => {
            const darkSkyUrl = `${url}/${locationDetails.features[0].geometry.coordinates[1]},${locationDetails.features[0].geometry.coordinates[0]}`;
            console.log(`dark sky ${darkSkyUrl}`);
            darkSky(darkSkyUrl , (err, weather) => {
                resp.send(weather);
            });

        });
    } catch (e) {
        console.log(e);
        resp.send('whether Error')
    }
});

app.get('/home/*', (req,res) => {
    res.render('error', {
        name: 'Vishnu',
        age : 28,
        date : new Date(),
        error: 'Home content not available'
    })
});
app.get('*', (req,res) => {
   res.render('error', {
       name: 'Vishnu',
       age : 28,
       date : new Date(),
       error: 'Page not found'
   })
});
app.listen(port, () => {
   console.log(`server started on ${port} `);
});
