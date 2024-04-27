(function() {

    let DB;
    const listadoCliente = document.querySelector('#listado-clientes');
    document.addEventListener('DOMContentLoaded',()=>{
        crearDb();

        if (window.indexedDB.open('CRM', 1)) {
            obtenerClientes();
        }

        listadoCliente.addEventListener('click', eliminarRegistro )
    });

    function eliminarRegistro(e) {
        //cc diste click en eliminar
        if (e.target.classList.contains('eliminar')) {

            //tomando el id del html
            const idEliminar = Number(e.target.dataset.cliente);
            
            const confirmar = confirm('Deseas Eliminar este cliente');
            if (confirmar) {
                const transaction = DB.transaction('CRM', 'readwrite');
                const objectStore = transaction.objectStore('CRM');
                objectStore.delete(idEliminar);
                transaction.oncomplete=function(){
                    console.log('Eliminado');
                    //eliminando el registro del html
                    e.target.parentElement.parentElement.remove();
                }
                transaction.onerror=function(){
                    console.log('Hubo un error');
                }
            }
        }
    }

    //crear Db de IndexDb
    function crearDb() {
        const crearDb = window.indexedDB.open('CRM', 1);

        crearDb.onerror=function(){
            console.log('Error al crear la base de datos');
        }
        crearDb.onsuccess=function(){
            console.log('Base de datos creada');
            DB=crearDb.result;
            console.log(DB);
        }
        crearDb.onupgradeneeded=function(e){
            const db=e.target.result;
            // console.log(db);
            const objectStore=db.createObjectStore('CRM',{keyPath:'id', autoIncrement:true });

            objectStore.createIndex('nombre','nombre', {unique:false});
            objectStore.createIndex('telefono','telefono', {unique:false});
            objectStore.createIndex('email','email', {unique:true});
            objectStore.createIndex('empresa','empresa', {unique:false});
            objectStore.createIndex('id','id', {unique:true});

            console.log('DB lista y creada');

        }
    }

    function obtenerClientes(){
        const abrirConexion = window.indexedDB.open('CRM', 1);
        abrirConexion.onerror=function(){
            console.log('Error al abrir la base de datos');
        }
        abrirConexion.onsuccess=function(){
            DB = abrirConexion.result;
            console.log(DB);
            const objectStore = DB.transaction('CRM').objectStore('CRM');

            objectStore.openCursor().onsuccess=function(e){
                const cursor=e.target.result;
                if(cursor){
                    const { nombre, empresa, email, telefono, id}=cursor.value;

                    listadoCliente.innerHTML +=
                    `
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>
                    </tr>
                    `;
                    cursor.continue();
                }else{
                    console.log('No hay mas registros');
                }
            }
        }
    }
}());