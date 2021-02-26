const request = require('request')

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&access_token=pk.eyJ1IjoicGFyaWtzaGl0amFndGFwIiwiYSI6ImNrbGhoZnczeTA2OTIyb3FpOWJpZzJnZGEifQ.2lFMHeHUuOjw7raeZMpwdg'

    request({url : url, json: true}, (error, {body})=> {
        if(error)
        {
            callback('unable to connect network', undefined)
        }else if(body.features== undefined || body.features.length==0)
        {
            callback('search not found, Please try different search', undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude :  body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode