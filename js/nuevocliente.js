(function(){
    let DB;
    const formulario= document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDb();
        formulario.addEventListener('submit',validarCliente);
    });
    function conectarDb() {
        const abrirConexion = window.indexedDB.open('crm', 1);
        abrirConexion.onerror=function(){
            console.log('Error al abrir la base de datos');
        }
        abrirConexion.onsuccess=function(){
            console.log('Base de datos abierta');
            DB=abrirConexion.result;
            console.log(DB);
        }
    }

    function validarCliente(e) {
        e.preventDefault();

        // leer los inputs 
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === "" || email === "" || telefono === "" || empresa === ""){
             console.log('error');

             return;
        }

        
    }
}) ();