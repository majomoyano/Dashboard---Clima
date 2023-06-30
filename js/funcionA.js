
/*######################   GRAFICO DE LINEA ####################*/
let plot = (data) => {
  /*La referencia al elemento HTML.*/
  const ctx = document.getElementById('myChart');
 
  const dataset = {
      labels: data.hourly.time, /* ETIQUETA DE DATOS */
      datasets: [{
          label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
          data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
      }]
  };

  /*configuración del gráfico*/
  const config = {
      type: 'line',
      data: dataset,
  };

  /*instanciación del gráfico*/ 
  const chart = new Chart(ctx, config); /*ctx: referencia al html*/





/*######################   GRAFICO DE BARRA ####################*/



  const ctx1 = document.getElementById('myChart1');
  const data1 = {
      labels: data.daily.time,
      datasets: [{
        label: 'Grafico UV',
        data: data.daily.uv_index_max,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };


  /*configuración del gráfico*/
  const config1 = {
    type: 'bar',
    data: data1,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };


  const chart1 = new Chart(ctx1, config1);
}




let load = (data) => {
 

      let timezone =data["timezone"] ;/*trae timezone y lo muestra en consola*/
      let tiempo = document.getElementById("timezone");
      tiempo.textContent = timezone;

      let latitude = data["latitude"]
      let latiHTML= document.getElementById("latitude")
      latiHTML.textContent = latitude;


      let longitude = data["longitude"]
      let longiHTML= document.getElementById("longitude")
      longiHTML.textContent = longitude;


                 

                 
      plot(data)

     
             
 
}

/*####################      fetch XML in JavaScript    #############################*/
let loadInocar = () => {
let URL = 'https://cors-anywhere.herokuapp.com/https://www.inocar.mil.ec/mareas/consultan.php';

fetch(URL)
.then(response => response.text())
  .then(data => {
     const parser = new DOMParser();
     const xml = parser.parseFromString(data, "text/html");
     let contenedorHTML = document.getElementById('table-container');
     let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
     /*let contenedorMareas = xml.getElementsByTagName('div')[0];*/
     
     contenedorHTML.innerHTML = contenedorMareas.innerHTML;
     /*console.log(xml);*/
  })
  .catch(console.error);
}









/*FUNCION AUTOEJECUTABLE------------------------------------*/
(
  function(){
     
      let meteo = localStorage.getItem('meteo');
      if(meteo == null) {
          let URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.14&longitude=-79.97&hourly=temperature_2m&daily=uv_index_max&timezone=auto";
             
          fetch(URL)
          .then(response => response.json())
          .then(data => {
              load(data)
     
              /* GUARDAR DATA EN MEMORIA */
              localStorage.setItem("meteo", JSON.stringify(data))
          })
          .catch(console.error);
     
        } else {
     
            /* CARGAR DATA EN MEMORIA */
            load(JSON.parse(meteo))
        }


        loadInocar();
  }
)();