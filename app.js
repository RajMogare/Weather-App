const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const conditionOutput=document.querySelector('.condition');
const nameOutput=document.querySelector('.name');
const icon=document.querySelector('.icon');
const cloudOutput=document.querySelector('.cloud');
const humadityOutput=document.querySelector('.humadity');
const windOutput=document.querySelector('.wind');
const form=document.querySelector('#locationInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');

let cityInput="Delhi";

cities.forEach((city)=>{
    city.addEventListener('click',(e)=>{
        cityInput=e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity="0";
    });
})

form.addEventListener('submit',(e)=>{
    if(search.value.length==0){
        console.log(search.value)
        alert('Please type the city name');
    }else{
        cityInput=search.value;
        fetchWeatherData();
        search.value="";
        app.style.opacity="0";
    }
    e.preventDefault();
});

function dayofTheWeek(day,month,year){
    const weekday=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData(){

    fetch(`http://api.weatherapi.com/v1/current.json?key=c01addbebf5f4253a50140248241601&q=${cityInput}`)
    .then(response=>response.json())
    .then((data)=>{
        console.log(data);
        temp.innerHTML=data.current.temp_c +"&#176;";
        nameOutput.innerHTML=data.location.name;
        conditionOutput.innerHTML=data.current.condition.text;
        cloudOutput.innerHTML=data.current.cloud+"%";
        humadityOutput.innerHTML=data.current.humidity+"%";
        windOutput.innerHTML=data.current.wind_kph+"km/h";
        
        const date=data.location.localtime;

        const y=parseInt(date.substr(0,4));
        const m=parseInt(date.substr(5,2));
        const d=parseInt(date.substr(8,2));
        const time=date.substr(11);

        dateOutput.innerHTML=`${ dayofTheWeek(d,m,y)} ${d}, ${m} ${y}`;
        dateOutput.innerHTML=`${d} / ${m} / ${y}`;
        timeOutput.innerHTML=time;
       
        const iconId=data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64".length);
        icon.src="./icons/"+iconId;


    //     let timeofDay="day";
    //     const code=data.current.condition.code;

    //     if(!data.current.is_day){
    //         timeofDay="night"
    //     }
    //     if(code==1000){
    //         app.style.backgroundImage=`url(images/${timeofDay}/clear.jpg)`;
    //         btn.style.background="#e5ba92";
    //         if(timeofDay=="night"){
    //             btn.style.background="#181e27";
    //         }
    //     }
    //     else if(
    //         code==1003||
    //         code==1006||
    //         code==1009||
    //         code==1030||
    //         code==1069||
    //         code==1087||
    //         code==1035||
    //         code==1073||
    //         code==1076||
    //         code==1079||
    //         code==1082
    // ){
    //     app.style.backgroundImage=`url(images/${timeofDay}/cloudy.jpg)`;
    //     btn,style.background="#fa6d1b";
    //     if(timeofDay=="night"){
    //         btn.style.background="#181e27";
    //     }
    // }
    // else if(
    //     code==1063||
    //     code==1069|| 
    //     code==1072||
    //     code==1050||
    //     code==1053||
    //     code==1080||
    //     code==1083||
    //     code==1086||
    //     code==1089||
    //     code==1092||
    //     code==1095||
    //     code==1204||
    //     code==1207||
    //     code==1240||
    //     code==1243||
    //     code==1246||
    //     code==1249||
    //     code==1252
    // ){
    //     app.style.backgroungImage=`url(images/${timeofDay}/rainy.jpg)`;
    //     btn.style.background="#647d75";
    //     if(timeofDay=="night"){
    //         btn.style.background="#325c80";
    //     }
    // }
    app.style.opacity="1";
    })
    .catch(()=>{
        alert('City not found, please try again');
        app.style.opacity="1";
    });
}
fetchWeatherData();
app.style.opacity="1";