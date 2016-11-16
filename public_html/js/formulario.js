function validarRegistro() {
    var verificar = true;
    var expNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    var expEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var expCP = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
    var expPsw = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var formulario = document.getElementById("miFormulario");
    var nombre = document.getElementById("nombre");
    var email = document.getElementById("em");
    var psw = document.getElementById("passw");
    var CP = document.getElementById("zip");


    if (!nombre.value) {
        alert("Ingrese un nombre");
        nombre.focus();
        verificar = false;
    } else if (!expNombre.exec(nombre.value)) {
        alert("Nombre no valido");
        nombre.focus();
        verificar = false;
    } else if (!email.value) {
        alert("Ingrese un email valido");
        email.focus();
        verificar = false;
    } else if (!expEmail.exec(email.value)) {
        alert("email no valido");
        email.focus();
        verificar = false;
    } else if (!psw.value) {
        alert("Ingrese una password valida");
        psw.focus();
        verificar = false;
    } else if (!expPsw.exec(psw.value)) {
        alert("contraseña no valido");
        psw.focus();
        verificar = false;
    }
    /**else if (!CP.value){
     alert("Ingrese un CP valido");
     CP.focus();
     verificar = false;
     }
     else if (!expCP.exec(CP.value)){
     alert("codigo postal no valido");
     CP.focus();
     verificar = false;
     }
     **/
    if (verificar) {
        alert("funciona");
       // document.miFormulario.submit();
    }
}

function validarLogin() {

    var email = document.getElementById("email");
    var psw = document.getElementById("pasw");
    var expEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var verificar = true;
    if (!email.value) {
        alert("Ingrese un email");
        email.focus();
        verificar = false;
    } else if (!expEmail.exec(email.value)) {
        alert("email no valido");
        email.focus();
        verificar = false;
    } else if (!psw.value) {
        alert("Ingrese una password valida");
        psw.focus();
        verificar = false;
    }

    if (verificar) {
          alert("funciona");
       //document.miFormulario.submit();

   }
}


window.onload = function () {
    var botonRegistro;
    var botonLogin;
    botonRegistro = document.getElementById("registrar");
    botonRegistro.onclick = validarRegistro;
    botonLogin = document.getElementById("login");
    botonLogin.onclick = validarLogin;
    botonRegistro.onclick = validarRegistro;
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


window.addEventListener("load", startdb, false);
window.addEventListener("click", agregarDato, false);
window.addEventListener("submit", comprobarDatos, false);

var dataBase = null;
function startdb() {

    dataBase = indexedDB.open("object", 1);

    dataBase.onupgradeneeded = function (e) {

        active = dataBase.result;

        object = active.createObjectStore("gente", {keyPath: 'email'});
        object.createIndex('by_nombre', 'nombre', {unique: false});
        object.createIndex('by_email', 'em', {unique: true});
        object.createIndex('by_psw', 'passw', {unique: false});




    };

    dataBase.onsuccess = function (e) {
        alert('Base de datos cargada correctamente');

    };

    dataBase.onerror = function (e) {
        alert('Error cargando la base de datos');
    };




}

function agregarDato() {

    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("em").value;
    var password = document.getElementById("passw").value;
    active = dataBase.result;
    var transaccion = active.transaction(["gente"], "readwrite");
    var almacen = transaccion.objectStore("gente");
    var agregar = almacen.add({nombre: nombre, email: email, password: password});
}


function comprobarDatos(){
       var email = document.getElementById("em").value;
      active = dataBase.result;
    var transaccion = active.transaction(["gente"], "readonly");
    var almacen = transaccion.objectStore("gente");
     almacen.openCursor().onsucess = function (e){
        var result = e.target.result;
        if (result.value.email === "asd@a.com" ){
               alert("funcionaaaa");
                   location.href = "../index.html";
                   result.continue();
        }
    };
    
    
}