//Creating an express object
const { response } = require('express')
const express = require('express')
const app = express()

//Creating a bodyparser opbject
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//Creating an https object
const https = require('https')




//Answering to client browser get request
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post('/',(req,res)=>{
    const userCity = req.body.temperatura
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=34a67814b4b379a052688597831470d8&units=metric`

    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data)
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const temperature =  weatherData.main.temp
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The temperarure description in ${userCity} is ${description} and temperature is ${temperature}</h1>`)
            res.write(`<img src="${iconUrl}">`)
            res.send()
        })
    })
})






//Opening a port
app.listen(8080, ()=>{
    console.log('Server is running on port 8080');
})