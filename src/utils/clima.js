const request = require('request')

const clima = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=71338e241ac5f393c02bf43d8728bd7a&query='+latitude+','+longitude
    let weather_descriptions


    request({url:url, json:true}, (error,{body}) => {
        weather_descriptions = body.current.weather_descriptions[0]
        temperature = body.current.temperature
        feelslike = body.current.feelslike
        precip = body.current.precip

        callback(undefined, {
            weather_descriptions: weather_descriptions,
            temperature: temperature,
            feelslike: feelslike,
            precip: precip
        })
    })
}

module.exports = clima