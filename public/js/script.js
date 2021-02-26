// fetch('http://puzzle.mead.io/puzzle').then((response=>{
//     response.json().then((res=>{
//         console.log(res)
//     }))
// }))

var frm = document.querySelector('form');
var loc = document.querySelector('input')
var msg1 = document.querySelector('#message-1')
var msg2 = document.querySelector('#message-2')
var msg3 = document.querySelector('#message-3')
var msg4 = document.querySelector('#message-4')

frm.addEventListener('submit', (e)=>{
    e.preventDefault()

    fetch('/weather?address='+loc.value).then((response)=>{
    response.json().then((res)=>{
        msg1.textContent =''
        msg2.textContent =''
        msg3.textContent = ''
        msg4.textContent = ''
        document.getElementById("weather-img").src = "/img/weather.png"
        
        if(res.error)
        {
            msg1.textContent =res.error 
        }else{
            document.getElementById("weather-img").src = res.body.current.weather_icons[0]
            msg1.textContent =res.location+', '+res.body.location.region+', '+res.body.location.country
            document.getElementById("message-2").innerHTML = res.forecast+' &#8451;';
            msg3.textContent ='Forecast    :'+res.body.current.weather_descriptions[0]; 
            msg4.textContent ='Humidy : '+ res.body.current.humidity
        }
        
    })
    })
})