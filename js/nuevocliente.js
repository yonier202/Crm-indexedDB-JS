(function(){
    let DB;
    const formulario= document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDb();
        formulario.addEventListener('submit',validarCliente);
    });
    function conectarDb() {
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
        const transaction = DB.transaction(['CRM'], 'readwrite');

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

    function imprimirAlerta(mj, tipe){
        const alerta = document.querySelector('.alerta')
        // validacion para solo ejecutar 1 vez el mensaje 
        if (!alerta) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');
            if (tipe==='error') {
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            }else{
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');

            }
            divMensaje.textContent = mj;
            formulario.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        }
        
    }
}) ();