// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        alert('Debe seleccionar una imagen');
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('zodiaco/'+nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then( url =>{
                db.collection("datosZodiaco").add({
                    "posic" : parseInt(txtPosic.value),
                    "signo" : txtSigno.value,
                    "rango" : txtRango.value,
                    "elemento": txtElemento.value,
                    "astro": txtAstro.value,
                    "piedra": txtPiedra.value,
                    "url"   : url
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar(){
    txtPosic.value = ''
    txtSigno.value = '';
    txtRango.value = '';
    txtArchi.value = '';
    txtElemento.value = '';
    txtAstro.value = '';
    txtPiedra.value = '';
    txtPosic.focus();
}

// JavaScript para cerrar sesión después de 3 minutos de inactividad
// Tiempo de inactividad en milisegundos (3 minutos * 60 segundos * 1000 milisegundos)
const INACTIVITY_TIME = 3 * 60 * 1000;

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