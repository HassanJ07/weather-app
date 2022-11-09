
//ELEMENTS
const inputCity =document.querySelector('#city-input')        
const date = document.querySelector('.date')
const weekday = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Satudary"];
const body = document.querySelector('body');
const header = document.querySelector('header')
const divChart = document.querySelector('.canvas')
const chart = document.querySelector('#myChart')


//FUNCTIONS


 
 
 const weather = (city) =>{
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value}&units=metric&appid=80c34795227f596a664a9487f9e8dc38`)
    .then(response => response.json())
    .then((data) =>{
        console.log(data)
        let weatherContainer = document.createElement('div')
        weatherContainer.classList.add("container")
        
        const divCity = document.querySelector('h2')
       
        divCity.innerHTML="The Current weather in " + inputCity.value 
        let bDiv = document.createElement('div')
        bDiv.classList.add('card')
        body.append(bDiv)
        weatherContainer.append(bDiv)
        body.append(weatherContainer)
        header.append(divCity) 
        divChart.append(chart)
        

        
   

        for( let i = 0 ; i < data.list.length; i = i + 8){
            let divElement = document.createElement('div')
            divElement.classList.add("div-element")
            bDiv.append(divElement)
            let divDays = document.createElement('div')
            divDays.classList.add('days')
            divElement.append(divDays)
            let date = new Date(data.list[i].dt_txt)
            divDays.innerHTML= weekday[date.getDay()]
            let iconDiv = document.createElement("img")
            iconDiv.classList.add("icon");
            iconDiv.src =
            ("http://openweathermap.org/img/wn/" +
             data.list[0].weather[0].icon +
             "@2x.png")
             divElement.append(iconDiv)
             let tempDiv = document.createElement("div");
            tempDiv.classList.add("temp");
            tempDiv.innerText = Math.ceil(data.list[i].main.temp) + "°C";
            divElement.append(tempDiv)
            let description = document.createElement('div')
            description.innerText = data.list[i].weather[0].description;
            let humidity = document.createElement('div')
            humidity.classList.add('humidity')
            humidity.innerText= "Humidity : " +data.list[i].main.humidity;
            divElement.append(humidity)
            
            let windSpeed = document.createElement('div')
            windSpeed.classList.add('wind')
            windSpeed.innerText= "Wind Speed " + data.list[i].wind.speed + " Km/h"
            divElement.append(windSpeed);

            
           
            description.classList.add('desc');
            divElement.append(description)
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + inputCity.value + "')";
        }
       
       
        const myChart = new Chart(chart, {
          type: 'line',
          data: {
              labels: ['Hour1','Hour2',"Hour3"],
              datasets: [{
                  label: 'Temp for the next 3 hours',
                  data: [data.list[0].main.temp, data.list[1].main.temp, data.list[2].main.temp, data.list[3].main.temp,data.list[4].main.temp],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
               scales: {
                y: {
                    suggestedMin: -10,
                    suggestedMax: 45
                }
            }
          }
      });

    })}





//EVENTLISTENERS

inputCity.addEventListener('keyup',(e) =>{
    if (e.keyCode == 13){
        console.log(inputCity.value)
        weather()
        
    }
})