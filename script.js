const cityname = document.querySelector(".city")
const date = document.querySelector(".date")
const temp = document.querySelectorAll(".temp-main")
const tempname = document.querySelectorAll(".temp-name-main")
const time = document.querySelector(".time")
const day = document.querySelector(".day")
const months = document.querySelector(".month")
const year = document.querySelector(".year")
const hour = document.querySelector(".hour")
const mins = document.querySelector(".mins")
const am = document.querySelector(".am-pm")
const windSpeed = document.querySelector(".wind-speed")
const rainpossiblity = document.querySelector(".rain-possiblity")
const humidity = document.querySelector(".humidity")
const windspeedtwo = document.querySelector(".windspeed")
const feelLike = document.querySelector(".feel-like-temp")
const greetingText = document.querySelector(".gm")
const weather = document.querySelector(".weather-name")
const forecastName = document.getElementById("forecast-main")
const forecastsection= document.querySelector(".forecast-section")


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=";
const apiKey="652cb243ec2675c7770040cf00c801f5";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=new delhi&units=metric&appid="


let currrentdate = new Date();


const text = [
    "Good Morining",
    "Good Evening",
    "Good Night"
]



function setGreeting(){
    if(currrentdate.getHours()<12){
        greetingText.innerHTML = text[0]
    }else if(currrentdate.getHours()>12 && currrentdate.getHours()<17){
        greetingText.innerHTML = text[1]
    }else if(currrentdate.getHours()>17){
        greetingText.innerHTML = text[2]
    }
}


day.innerHTML = currrentdate.getDate()
months.innerHTML = currrentdate.getMonth()
year.innerHTML = currrentdate.getFullYear()

setInterval(() => {
    hour.innerHTML = currrentdate.getHours()
    mins.innerHTML = (currrentdate.getMinutes()<10 ? "0" :"")+currrentdate.getMinutes() 
}, 1000);





async function fetchWeather(){

    const response = await fetch(apiUrl+apiKey)
    const data =await  response.json();
    console.log(data)
    rainpossiblity.innerHTML = data.main.humidity
    windSpeed.innerHTML = data.wind.speed
    humidity.innerHTML = (data.main.humidity)+" "+"%"
    windspeedtwo.innerHTML = (data.wind.speed)+" "+"mph"
    feelLike.innerHTML = (data.main.feels_like)+"°"
    weather.innerHTML = data.weather[0].main
    temp.forEach((e)=>{
        e.innerHTML = Math.round(data.main.temp)
    })
    tempname.forEach((e)=>{
        e.innerHTML=data.weather[0].main
    }) 
    return data;
}



const forecast  = async ()=>{
    const response = await fetch(forecastUrl+apiKey)
    const data = await response.json()
    console.log(data.list)

    forecastsection.innerHTML = "";

    data.list.slice(0,6).forEach((e)=>{

        const forecastcontainer = document.createElement('div')
        forecastcontainer.classList.add('forecast-container')
        forecastcontainer.innerHTML = ` <h3>${new Date(e.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                        <span><p>${e.main.temp}</p><p>°</p></span>
                        <h6 id="forecast-main">${e.weather[0].main}</h6>`
        forecastsection.appendChild(forecastcontainer)
    })

}












setGreeting()
fetchWeather()
forecast()