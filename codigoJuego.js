
/*
Actividad Nº: 3
Descripción: Web Responsive BootStrap + Juego Adivinanza en JavaScrip
ISPC: Desarrolador Full Stack
Fecha limite entrega: 04/12/2020

Alumno: Victor Raul Alberto Pedron
mail: victor.pedron@gmail.com
Version    : a3.0
Revisión   : 06.12.2020
*/

/* Declaracion de variables globales */

  var i_Intentos = 0;
  var i_Puntos = 100;
  var i_Que_Adivinanza = 0;
  var i_Tiempo = 0;
  var RefTIMER;

  var a_Adivinanzas = new Array(5);
  var a_RespValidas = new Array(5);

  var a_Pista1 = new Array(5);
  var a_Pista2 = new Array(5);

  var primeraVEZ = true;

  // Retorna un entero aleatorio entre min (incluido) y max (excluido)
  function get_Adivinanza(min, max) {
    let aux = 0;
    
    aux = Math.floor(Math.random() * (max - min)) + min;
    return aux;
    }

function iniciarDatos() {
  
  i_Intentos = 0;
  i_Puntos = 0;
  i_Que_Adivinanza = 0;
  i_Tiempo = 0;

  //Bucle para meter en cada posición otros array de 10
  //de esta manera tengo una matriz
  for(var i=0; i<10; i++) {
    a_RespValidas[i] = new Array(10);
  }

  //Inicializo la matriz de respuestas
  for(var i=0; i<5; i++) {
    for(var j=0; j<10; j++) {
      a_RespValidas[i][j] = "";
    }
  }

  a_Adivinanzas[0] = "De muy lejos vengo, a muy lejos voy, piernas no tengo y viajero soy";
  a_RespValidas[0][0] = "Camino";
  a_RespValidas[0][1] = "Caminos";
  a_RespValidas[0][2] = "Calle";
  a_RespValidas[0][3] = "Calles";
  a_RespValidas[0][4] = "El Camino";
  a_RespValidas[0][5] = "Los Caminos";
  a_RespValidas[0][6] = "La Calle";
  a_RespValidas[0][7] = "Las Calles";
  a_Pista1[0] = "La cruzamos cotidianamente";
  a_Pista2[0] = "Puede ser de tierra, asfalto, piedra, hormigon";

  a_Adivinanzas[1] = "Un señor muy estirado en la calle está a tu lado cuando quiere que no pases se pone colorado";
  a_RespValidas[1][0] = "Semaforo";
  a_RespValidas[1][1] = "Semaforos";
  a_RespValidas[1][2] = "El semaforo";
  a_RespValidas[1][3] = "Los semaforos";
  a_RespValidas[1][4] = "Semáforo";
  a_RespValidas[1][5] = "Semáforos";
  a_RespValidas[1][6] = "El semáforo";
  a_RespValidas[1][7] = "Los semáforos";
  a_Pista1[1] = "La mayoria de las veces estoy en una esquina";
  a_Pista2[1] = "Tengo tres colores";

  a_Adivinanzas[2] = "En la calle me verás y al cruzar de un lado a otro, mis rayas pisarás";
  a_RespValidas[2][0] = "Senda Peatonal";
  a_RespValidas[2][1] = "La Senda Peatonal";
  a_RespValidas[2][2] = "La Senda de Peatones";
  a_RespValidas[2][3] = "Senda de Peatones";
  a_RespValidas[2][4] = "Senda Peatones";
  a_Pista1[2] = "Soy de color blanco";
  a_Pista2[2] = "Aveces me confunde con una cebra por mis rayas";

  a_Adivinanzas[3] = "Por el día y por la noche, me lo pongo en el coche, y en caso de frenazo no me doy un porrazo";
  a_RespValidas[3][0] = "Cinturon";
  a_RespValidas[3][1] = "Cinturon Seguridad";
  a_RespValidas[3][2] = "El Cinturon de Seguridad";
  a_RespValidas[3][3] = "Cinturon de Seguridad";
  a_Pista1[3] = "Soy de color Negro y estoy siembe al lado del asiento";
  a_Pista2[3] = "Si no me usas te pones en un riesgo";

  a_Adivinanzas[4] = "Zapatos de goma, ojos de cristal, con una manguera lo alimentarás, dentro del garaje lo sueles guardar";
  a_RespValidas[4][0] = "El coche";
  a_RespValidas[4][1] = "Coche";
  a_RespValidas[4][2] = "El Auto";
  a_RespValidas[4][3] = "Auto";
  a_Pista1[4] = "Podemos ser de variadas marcas, modelos y colores";
  a_Pista2[4] = "Tenemos 4 Zapatos de Goma";

}

function limpiarPanel(Intentos, Puntos, Tiempo, Adivinanza, Mensaje) {

  document.getElementById("textoIntentos").innerHTML = Intentos;
  document.getElementById("textoPuntos").innerHTML = Puntos;
  document.getElementById("textoTiempo").innerHTML = Tiempo;
  document.getElementById("textoAdivinanza").innerHTML = Adivinanza;
  document.getElementById("tipoMensaje").innerHTML = Mensaje;

  document.getElementById("textoPista1").value = "1 ************";
  document.getElementById("textoPista2").value = "2 ************";
  document.getElementById("textoRespuesta").value = "";
    
  document.getElementById("imgAdivinanza").src="imagenes/adivinanza_x.png";
  document.getElementById("imgAdivinanza").style = "";

}

function inicioPaginaJuego() {

  iniciarDatos();
  
  limpiarPanel("x/4",0,"0","? *** ?", "<strong>Mucha Suerte!</strong> para ti");
  
  document.getElementById('btnPista1').disabled = true;
  document.getElementById('btnPista2').disabled = true;
  
  document.getElementById('textoRespuesta').disabled = true;
  document.getElementById('btnComprobar').disabled = true;

  document.getElementById('chkSensible').disabled = true;
  document.getElementById('chkSensible').checked = true;

}


function inicioJuego() {

  var auxS = ""
  i_Intentos = 0;
  i_Puntos = 100;
  i_Que_Adivinanza = get_Adivinanza(0,5);
  i_Tiempo = 0;
 
  auxS = "<strong>" + (i_Que_Adivinanza + 1)  + " - " + a_Adivinanzas[i_Que_Adivinanza] + "</strong>"

  limpiarPanel(i_Intentos + "/4", i_Puntos,"0", auxS , "<strong>Mucha Suerte!</strong> para ti");
  
  const botonP1 = document.querySelector('#btnPista1');
  botonP1.setAttribute('class', 'btn btn-light');
  const botonP2 = document.querySelector('#btnPista2');
  botonP2.setAttribute('class', 'btn btn-light');

  document.getElementById('btnPista1').disabled = true;
  document.getElementById('btnPista2').disabled = true;
  
  document.getElementById('textoRespuesta').disabled = false;
  document.getElementById('btnComprobar').disabled = false;

  document.getElementById('chkSensible').disabled = false;
  document.getElementById('chkSensible').checked = true;

  auxS = "Recuerda que tiene 4 Intentos para adivinar el Acertijo.<br><br>"
  auxS = auxS + "En el intento Nº 2 se te habilitara la Pista 1.<br><br>";
  auxS = auxS + "Y en el intento Nº 3 se te habilitara la Pista 2.<br><br>";

  mostrarAlerta("ADV", auxS );

  if (primeraVEZ == true) {
      primeraVEZ = false;
  } else {
      clearInterval(refTIMER);
  }
  refTIMER = setInterval(function(){document.getElementById("textoTiempo").innerHTML = i_Tiempo++;}, 1000, "JavaScript");
  
}


function mostrarAlerta(tipo, mensaje) {
  
  let cadenaHTML = "";

  switch(tipo) {
    case "ERROR":
        // algun error imprevisto
        cadenaHTML = '<img class="img-fluid" src="imagenes/mError.png" alt="Error">'; 
        document.getElementById("tituloModal").innerHTML = cadenaHTML + "<h1>ERROR</h1>";
        cadenaHTML = '<div class="alert alert-danger"><strong>' +  mensaje + '</strong></div>';
        document.getElementById("mensajeModal").innerHTML = cadenaHTML;
        break;
    case "SINDATO":
        // no ingreso nada en la respuesta
        cadenaHTML = '<img class="img-fluid" src="imagenes/mAdvertencia.png" alt="Sin Dato">'; 
        document.getElementById("tituloModal").innerHTML = cadenaHTML + "<h1>SIN DATO</h1>";
        cadenaHTML = '<div class="alert alert-warning"><strong>' +  mensaje + '</strong></div>';
        document.getElementById("mensajeModal").innerHTML = cadenaHTML;
        break;
    case "NOES":
        // La Respuesta NO es Valida
        cadenaHTML = '<img class="img-fluid" src="imagenes/mIncorrecta.png" alt="Incorrecta">'; 
        document.getElementById("tituloModal").innerHTML = cadenaHTML + "<h1>Respuesta INCORRECTA</h1>";
        cadenaHTML = '<div class="alert alert-danger"><strong>' +  mensaje + '</strong></div>';
        document.getElementById("mensajeModal").innerHTML = cadenaHTML;
        break;
    case "SIES":
        // La Respuesta SI es Valida
        cadenaHTML = '<img class="img-fluid" src="imagenes/mCorrecta.png" alt="Error">'; 
        document.getElementById("tituloModal").innerHTML = cadenaHTML + "<h1>Respuesta CORRECTA</h1>";
        cadenaHTML = '<div class="alert alert-success"><strong>' +  mensaje + '</strong></div>';
        document.getElementById("mensajeModal").innerHTML = cadenaHTML;
        break;
    case "GameOVER":
          // La Respuesta SI es Valida
          cadenaHTML = '<img class="img-fluid" src="imagenes/mGameOver.gif" alt="Error">'; 
          document.getElementById("tituloModal").innerHTML = cadenaHTML + "<h1>PERDISTE</h1>";
          cadenaHTML = '<div class="alert alert-danger"><strong>' +  mensaje + '</strong></div>';
          document.getElementById("mensajeModal").innerHTML = cadenaHTML;
          break;
    default:
      //  Cualquier otro Mensaje
      cadenaHTML = '<img class="img-fluid" src="imagenes/mAdvertencia.png" alt="Error">'; 
      document.getElementById("tituloModal").innerHTML = cadenaHTML + "<h1>ADVERTENCIA</h1>";
      cadenaHTML = '<div class="alert alert-danger"><strong>' +  mensaje + '</strong></div>';
      document.getElementById("mensajeModal").innerHTML = cadenaHTML;
  }   
  
  $("#ventanaModal").modal();
}


function comprobarRespuesta(Respuesta) {

  let bSalir = false;
  let j = 0;
  let posicionR = -1;

  if (document.getElementById('chkSensible').checked == true) {
      posicionR = a_RespValidas[i_Que_Adivinanza].indexOf(Respuesta);
  } else{
      while ((bSalir == false) && (j < 10)) {
          posicionR = a_RespValidas[i_Que_Adivinanza][j].toLowerCase().indexOf(Respuesta.toLowerCase());
          if (posicionR !== -1) bSalir = true;
          j++;
      } 
  }

  if (posicionR !== -1)
      return true;
  else
      return false;
}


function verRespuesta() {
  
  let auxR = document.getElementById("textoRespuesta").value;
  let auxR2 = auxR.trim();
  let auxS = '';
  
  if (auxR2 == "") {
    mostrarAlerta("SINDATO", "Tienes que ingresar una respuesta");  
  } else {
      i_Intentos++;
      if ( comprobarRespuesta(auxR2) == true ) {

          clearInterval(refTIMER)
          document.getElementById("textoTiempo").innerHTML = i_Tiempo;

          document.getElementById("textoIntentos").innerHTML = i_Intentos + " / 4";
          document.getElementById("textoPuntos").innerHTML = i_Puntos;

          auxS = "FELICITACIONES!!!! Lo adivinaste en " + i_Intentos + " intentos.";
          auxS = auxS + "<br>";
          auxS = auxS + "Tu puntuacion Final es de " + i_Puntos + " Puntos.";
          auxS = auxS + "<br>";
          auxS = auxS + "Lo resolviste en un tiempo de: " + i_Tiempo + " segundos.";
          mostrarAlerta("SIES", auxS );

          document.getElementById('btnPista1').disabled = true;
          document.getElementById('btnPista2').disabled = true;
  
          document.getElementById('textoRespuesta').disabled = true;
          document.getElementById('btnComprobar').disabled = true;

          document.getElementById('chkSensible').disabled = true;

      } else {
          if (i_Intentos < 4) {
              i_Puntos = i_Puntos - 10;
              document.getElementById("textoIntentos").innerHTML = i_Intentos + " / 4";
              document.getElementById("textoPuntos").innerHTML = i_Puntos;
              mostrarAlerta("NOES", "Que lastima NO es la respuesta correcta, vuelve a intentarlo");
              if (i_Intentos == 2) {
                  const botonPista = document.querySelector('#btnPista1');
                  botonPista.setAttribute('class', 'btn btn-primary');
                  document.getElementById('btnPista1').disabled = false;
              }
              if (i_Intentos == 3) {
                  const botonPista = document.querySelector('#btnPista2');
                  botonPista.setAttribute('class', 'btn btn-primary');
                  document.getElementById('btnPista2').disabled = false;
              }

          }  // FIN if (i_Intentos < 4) 
          if (i_Intentos == 4){
              
              clearInterval(refTIMER);
              document.getElementById("textoTiempo").innerHTML = i_Tiempo;

              i_Puntos = 0;
              document.getElementById("textoIntentos").innerHTML = i_Intentos + " / 4";
              document.getElementById("textoPuntos").innerHTML = i_Puntos;
              mostrarAlerta("GameOVER", "Que lastima NO pudo ser, vuelve a intentarlo SI!!!!!");

              document.getElementById('btnPista1').disabled = true;
              document.getElementById('btnPista2').disabled = true;
  
              document.getElementById('textoRespuesta').disabled = true;
              document.getElementById('btnComprobar').disabled = true;

              document.getElementById('chkSensible').disabled = true;

          } // FIN if (i_Intentos = 4)
      } // FIN if ( comprobarRespuesta(auxR2) == true ) 
  } // FIN if (auxR2 == "") {
}

function verPista1(){
  document.getElementById("textoPista1").value = a_Pista1[i_Que_Adivinanza];
  i_Puntos = i_Puntos - 10;
  document.getElementById("textoPuntos").innerHTML = i_Puntos;
  document.getElementById("imgAdivinanza").src="imagenes/adivinanza_"+ i_Que_Adivinanza + ".png";
  document.getElementById("imgAdivinanza").style = "filter: blur(18px);";
  document.getElementById('btnPista1').disabled = true;
}
function verPista2(){
  
  document.getElementById("textoPista2").value = a_Pista2[i_Que_Adivinanza];
  i_Puntos = i_Puntos - 10;
  document.getElementById("textoPuntos").innerHTML = i_Puntos;
  document.getElementById("imgAdivinanza").src="imagenes/adivinanza_"+ i_Que_Adivinanza + ".png";
  document.getElementById("imgAdivinanza").style = "filter: blur(8px);";
  document.getElementById('btnPista2').disabled = true;
}


  


