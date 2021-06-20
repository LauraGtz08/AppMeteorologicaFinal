console.log("Hello from client side!");

const address = document.querySelector("input")
const boton = document.querySelector("#submit")
const message_1 = document.querySelector("#message-1")
const message_2 = document.querySelector("#message-2")
const message_3 = document.querySelector("#message-3")
const message_4 = document.querySelector("#message-4")

boton.addEventListener("click", (e) => {
    const location = address.value
    console.log(location)
    fetch("http://localhost:8000/getweather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message_1.textContent=data.error
            }else{
            
                message_1.textContent=data.weather_descriptions
                message_2.textContent=data.temperature + " ° C"
                message_3.textContent=data.feelslike + " ° C"
                message_4.textContent=data.precip + " % de lluvia"

                img.src = "";


                if (data.weather_descriptions == "Sunny" || "Partly sunny") {
                    img.src = "/img/warm.png";
                }

                if (data.weather_descriptions == "Mist"){
                    img.src = "/img/neblina.png";
                }


                if (data.weather_descriptions == "Cloudy" || "Partly cloudy"){
                    img.src = "/img/nube.png";
                }

                if (data.weather_descriptions == "Rain" || "Partly rain" || "Heavy rain"){
                    img.src = "/img/raining.png";
                }       
            }
        })
    })
})
