const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


//define paths for express config
const publicdirectory = path.join(__dirname, '../public')
const hanldebarPath = path.join(__dirname,'../template/view')
const partialPath = path.join(__dirname, '../template/partial')

//setiing handle bar
app.set('view engine', 'hbs')
app.set('views', hanldebarPath)
hbs.registerPartials(partialPath)
//for static serve
app.use(express.static(publicdirectory))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Parikshit Jagtap'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        title : 'Help',
        name : 'Parikshit Jagtap',
        message : 'if you want any help, Please contact me'
    })
})

//app.use(express.static(publicabout))
app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Me',
        name :'Parikshit Jagtap'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({error:'Please provide the addeess'})
    }
    const loc = req.query.address
    forecast(loc, (error, body)=>{
            if(error)
            {
                return res.send({error:error})
            }

            return res.send({
                location : body.location.name,
                forecast : body.current.temperature,
                body 
            })
        })
    // res.send({
    //     location : req.query.address,
    // })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title : 'Help page not found',
        message : 'Help article has not found',
        name : 'Parikshit Jagtap'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title : '404 Page Not found',
        message:'Page not found',
        name : 'Parikshit Jagtap'
    })
})
app.listen(3000,()=>{
    console.log('server is running on 3000')
})