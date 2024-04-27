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