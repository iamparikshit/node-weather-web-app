const request = require('request')

const forecast = (address, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2d3e753a69a2ac038be0da6258c4539f&query='+encodeURIComponent(address)

    request({url : url, json : true}, (error, {body}={})=>{
        if(error)
        {
            callback('Unable to connet to network',undefined)
        }else if(body.error)
        {
            callback('Unable to find the location, Please search for different one',undefined)
        }else{
            callback(undefined,body)
        }
        
    })
}
module.exports = forecast