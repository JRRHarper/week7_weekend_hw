window.onload = function(){
  console.log('App started');
  var url = "https://restcountries.eu/rest/v1"
  var request = new XMLHttpRequest();
  request.open("GET", url);

  var countriesList = document.getElementById('countries_list');


  request.onload = function(){
    if(request.status === 200){
      console.log('got the data');
      console.log(request.responseText);
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);


      for (var index in countries){
        var country = countries[index];
        var countryOption = document.createElement('option');
        countryOption.value = index;
        countryOption.innerText = country.name;
        countriesList.appendChild(countryOption);
      };
        
      countriesList.onchange = function() {
        localStorage.setItem('country', countriesList.value);
        var countryIndex = document.getElementById("countries_list").value;
        var foundCountry = countries[countryIndex];
        countryNameFunction(foundCountry);
        countryCapitalFunction(foundCountry);
        countryPopulationFunction(foundCountry);
        countryLatLngFunction(foundCountry)
        countryPopChart(foundCountry)
        countryAreaChart(foundCountry)

      }

      var countryNameFunction = function(foundCountry){
       var countryNameEl = document.getElementById("countryName");
       countryNameEl.innerHTML = "";
       var countryNameValue = document.createElement('p');
       countryNameValue.innerText = foundCountry.name;
       countryNameEl.appendChild(countryNameValue);
      }


      var countryCapitalFunction = function(foundCountry){
       var countryCapitalEl = document.getElementById("countryCapital");
       countryCapitalEl.innerHTML = "";
       var countryCapitalValue = document.createElement('p');
       countryCapitalValue.innerText = foundCountry.capital;
       countryCapitalEl.appendChild(countryCapitalValue);
      }

      var countryPopulationFunction = function(foundCountry){
       var countryPopulationEl = document.getElementById("countryPop");
       countryPopulationEl.innerHTML = "";
       var countryPopulationValue = document.createElement('p');
       countryPopulationValue.innerText = foundCountry.population.toLocaleString();
       countryPopulationEl.appendChild(countryPopulationValue);
        }

      var countryLatLngFunction = function(foundCountry){
        var countryNameEl = document.getElementById("countryName");
        var latNew = foundCountry.latlng[0];
        var lngNew = foundCountry.latlng[1];
        var center = {lat: latNew, lng: lngNew};
        var map = new Map(center, 4);
        map.addInfoWindow(center, foundCountry)
        }

          var countryPopChart = function(foundCountry){
          var chartContainer = document.getElementById("chart1");
          var barChart = new Highcharts.Chart({
              chart: {
                type: 'column',
                renderTo: chartContainer
              },
              title: {
                text: "Compare population of current country and UK"
              },
              series: [{
                name: foundCountry.name,
                data: [foundCountry.population],
                color: 'orange'
                },
                {
                  name: "United Kingdom",
                data: [64800000],
                color: 'darkblue'
                }],
                    
                xAxis: {
                  categories: ['Countries']
                },

                yAxis: {
                  title: {
                    text:"Population"
                  }
                },

                credits: {
                  enabled: false
                }
              });
        }

        }


          var countryAreaChart = function(foundCountry){
          var chartContainer = document.getElementById("chart2");
          var barChart = new Highcharts.Chart({
              chart: {
                type: 'column',
                renderTo: chartContainer
              },
              title: {
                text: "Compare land area of current country and UK"
              },
              series: [{
                name: foundCountry.name,
                data: [foundCountry.area],
                color: 'orange'
                },
                {
                  name: "United Kingdom",
                data: [242900],
                color: 'darkblue'
                }],
                    
                xAxis: {
                  categories: ['Countries']
                },

                yAxis: {
                  title: {
                    text:"area"
                  }
                },

                credits: {
                  enabled: false
                }
              });
        }

          


      
      if (localStorage['country']) {
        countriesList.value = localStorage['country'];

        countryNameFunction(countries[localStorage['country']])
        countryCapitalFunction(countries[localStorage['country']])
        countryPopulationFunction(countries[localStorage['country']])
        countryLatLngFunction(countries[localStorage['country']])
        countryLatLngFunction(countries[localStorage['country']])
        countryPopChart(countries[localStorage['country']])
        countryAreaChart(countries[localStorage['country']])
      }



  };
  request.send();
};