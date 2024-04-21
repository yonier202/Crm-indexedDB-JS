(function() {

    let DB;
    document.addEventListener('DOMContentLoaded',()=>{
        crearDb();
    });

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
}());