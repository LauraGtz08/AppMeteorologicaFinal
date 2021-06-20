const { name } = require("ejs");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 8000; 
const geocodificacion = require("./utils/geocodificacion");
const clima = require("./utils/clima");
app.set("view engine", "ejs");
app.set("view engine", "hbs");
app.use(express.static('public'));
hbs.registerPartials(path.join(__dirname,"../",'/views/partials'));

app.use(express.urlencoded({
    extended: true
}));


app.get("/", function(request, response){
    response.render("index", {
        title: "Weather App",
        name: "Laura T Gutierrez G"
    })
})

//API: RECIBIR SOLICITUD Y ENVIAR MENSAJE (NAVEGADOR LO CONVIERTE A JSON)
app.get("/getweather", function (request, response){
    if (!request.query.address){
        return response.send({
            error: "You have to provide an address..."
        })
    }


    geocodificacion(request.query.address, (error,data) => { //CALLBACK
        if (error){
            return console.log("Error: ", error)
        }
        clima(data.latitude, data.longitude, (error,data) => {
            if (error){
                return console.log("Error: ", error)
            }
            console.log("El clima es: ", data)
            response.send({
                weather_descriptions: data.weather_descriptions,
                temperature: data.temperature,
                feelslike: data.feelslike,
                precip: data.precip
            })
        })
    })
})


app.get("/about", function(request, response){
    response.render("about")
})

app.get("/help", function(request, response){
    response.render("help")
})

app.get("/weather", function(request, response){
    response.render("weather")
})

app.get("*", function(request,response){
    response.render("404", {
        title: "404",
        errorMessage: "NOT FOUND"
    })
})


app.listen(port, function(){
    console.log("Listening at http://localhost:8000/");
    hbs.registerPartials(path.join(__dirname,"../",'/views/partials'));
})