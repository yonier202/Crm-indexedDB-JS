(function() {
    let DB;
    nombreInput = document.querySelector('#nombre');
    emailInput = document.querySelector('#email');
    telefonoInput = document.querySelector('#telefono');
    empresaInput = document.querySelector('#empresa');
    idInput = document.querySelector('#id');

    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded', ()=>{

        conectarDB();

        //Actualizar registro
        formulario.addEventListener('submit', actulizarCliente);
            

        //Verificar el ID de la URL(Leer query string)
        const parametrosURL = new URLSearchParams(window.location.search);

        const idCliente = parametrosURL.get('id');
        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
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

    function obtenerCliente(id) {
        const transaction = DB.transaction('CRM','readwrite');
        const objectStore = transaction.objectStore('CRM');
        const cliente =  objectStore.openCursor();
        cliente.onsuccess=function(e){
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    console.log(cursor.value);
                    llenarFormulario(cursor.value);
                }
                // cursor.continue();
            } else {
                console.log('No existe el cliente');
            }
        }
    }
    

    function llenarFormulario(cliente) {
        const {nombre, email, telefono, empresa, id } = cliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        idInput.value = id;
    }

    function actulizarCliente(e) {
        e.preventDefault();
        if (nombreInput.value === "" || emailInput.value === "" || telefonoInput.value === "" || empresaInput.value === "") {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // actulizar cliente 
        const ClienteActualizado = {
            nombre : nombreInput.value,
            email : emailInput.value,
            telefono : telefonoInput.value,
            empresa : empresaInput.value,
            id : Number(idInput.value)
        }
        console.log(ClienteActualizado);

        const transaction = DB.transaction(['CRM'],'readwrite');
        const objectStore = transaction.objectStore('CRM');
        objectStore.put(ClienteActualizado);
        transaction.oncomplete=function(){
            imprimirAlerta('Editado Correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);

        }     
        transaction.onerror=function(){
            imprimirAlerta('Hubo un error ', 'error');
        }
    }

})();