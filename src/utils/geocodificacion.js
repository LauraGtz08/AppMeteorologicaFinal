const request = require('request')

const geocodificacion = (address, callback) => {//FUNCION REUTILIZABLE
    const url_geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHR0cHMtbGF1cmFnIiwiYSI6ImNrcDM3MzN2ZjA0NXcybnB0N3J4Zmp1Z2kifQ.j6dOGTlB475mPfCvqa-Wpw'
    request({url:url_geocoding, json:true}, (error,{body}) => {
        if (error){
            callback("NO ES POSIBLE CONECTAR CON EL SERVICIO DE GEOCODING", undefined) //ERROR DE BAJO NIVEL
        }else if(body.features.length === 0){
            callback("NO ES POSIBLE ENCONTRAR LA UBICACIÓN, INTENTE DE NUEVO :)", undefined) //ERROR DE ALTO NIVEL
        }else{
            longitude = body.features[0].center[0]
            latitude = body.features[0].center[1]
            callback(undefined, {
                longitude: longitude,
                latitude: latitude
            })
        }
    })
}

module.exports = geocodificacion
