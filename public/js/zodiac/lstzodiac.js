var db = firebase.apps[0].firestore();

			const tabla = document.querySelector('#tabla');

			db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
				tabla.innerHTML="";
				var salida = "";
				query.forEach(function(doc){
					salida += '<div class="divAnuncio m-3">'
						salida += '<div class="imgBlock"><img src="' + doc.data().url +'" width="100%" /></div>'
						salida += '<div>'+ doc.data().signo + '<br/>'+ doc.data().rango + '<br/>'+ doc.data().elemento + '<br/>'+ doc.data().astro + '<br/>'+ doc.data().piedra +'</div><br/>'

					salida += '</div>'
				})
				tabla.innerHTML = salida;
			})
// JavaScript para cerrar sesión después de 3 minutos de inactividad
// Tiempo de inactividad en milisegundos (3 minutos * 60 segundos * 1000 milisegundos)
const INACTIVITY_TIME = 30 * 1000;

let timeoutId;

function resetTimer() {
    // Si ya hay un temporizador, lo borramos
    clearTimeout(timeoutId);

    // Y establecemos uno nuevo
    timeoutId = setTimeout(() => {
        // Aquí pondrías tu función de cierre de sesión
        firebase.auth().signOut().then(() => {
            alert('Has sido desconectado por inactividad.');
            // Redireccionar a la página de inicio de sesión
            window.location.assign('/login.html');
        }).catch((error) => {
            // Manejar errores aquí
            console.error('Error al cerrar la sesión: ', error);
        });
    }, INACTIVITY_TIME);
}

// Añadir eventos de movimiento del mouse y teclado en el documento
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);

// Inicializar el temporizador la primera vez
resetTimer();