(function(){
    let DB;
    const formulario= document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        formulario.addEventListener('submit',validarCliente);
    });
    
    function conectarDB() {
        const abrirConexion = window.indexedDB.open('CRM', 1);
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
            imprimirAlerta('Todos los campos son obligatorios', 'error')

            return;
        }
        //Crear objeto con la informacion
        const cliente={
            nombre : nombre,
            email : email,
            telefono : telefono,
            empresa : empresa,
            id: Date.now()
        }
        console.log(cliente);

        crearCliente(cliente)

        
    }

    function crearCliente(cliente) {
        const transaction = DB.transaction('CRM', 'readwrite');

        const objectStore = transaction.objectStore('CRM');
        objectStore.add(cliente);
        transaction.oncomplete=function(){
            console.log('Cliente agregado');
            imprimirAlerta('Cliente agregado con exito');
            formulario.reset();
            setTimeout(() => {
                window.location.href='index.html';
            }, 3000);
        }
        transaction.onerror=function(){
            console.log('Error al agregar el cliente');
            imprimirAlerta('Error al agregar el cliente', 'error');
        }
    }

}) ();