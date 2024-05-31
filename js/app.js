//let totalIngresos = 5000;
//let totalEgresos = 2000;

//definir el arreglo para los ingresos y para los egresos 


const ingresos = [
    new Ingresos("Sueldo",2000),
    new Ingresos("venta coche",500)    
];
const egresos = [
    new Egresos("Renta casa",1500),
    new Egresos("Recarga celular",200)
];

//menu que carga la applicacion, esta menu es importante cargarlo con las funciones que cargan elementos de htmnl para poder mostrar datos predeterminados en el codigo
let cargarApp = () => {
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}


//crear dos funciones que sean totalIngresos y totalEgresos
const totalIngresos = () => {
    //crear una variable con valor de 0
    let totalIngresos = 0;
    //crear un ciflo for of que nos itere los objetos de la const ingresos
    //se usa for of por que estamos obteniendo directamente los valores del objeto, excluyendo la posicion
    for (let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    //retornar el valor
    return totalIngresos;
}
//funcion egresos
const totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}


//funcion flecha encargada de operar el cabecero
const cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingreso').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egreso').innerHTML = formatoMoneda(totalEgresos());

    //console.log("Mi presupuesto es de: " + presupuesto)
    //console.log("El porcentaje gastado es: " + porcentaje)
}


//formato para mostrar la moneda
const formatoMoneda = (valor) => {
    //returnamos el cambio de moneda y el estilo en el que se muestra
    return valor.toLocaleString('es-MX',{style: 'currency',currency: "MXN",minimumFractionDigits:2})
}

//funcion de formato de porcentaje
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX",{style: "percent", minimumFractionDigits:2})
}

//las siguientes lineas son para los INGRESOS, se van a crear funciones: cargarIngresos(), crearIngresos(), eliminarIngreso() 

//funcion cargarIngreso
const cargarIngresos = () => {
    //crear una variable llamada ingresosHTML
    let ingresosHTMl = '';
    for (let ingreso of ingresos){
       ingresosHTMl += crearIngresosHtml(ingreso); 
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTMl;
}

//crear funcion que nos cree los eventos html que se van a renderisar
const crearIngresosHtml = (ingreso) => {
    let ingresoTemplate = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                <ion-icon name="close-circle-outline" ></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    //retornamos la variable
    return ingresoTemplate;
}
//crear la funcion eliminar ingreso, esta trabaja con el id para eliminar los ingresos
const eliminarIngreso = (id) => {
    //guardamos en una variable que guarde el recorrido del array ingresos y mediante la funcion findIndex(evaluaremos el indice que querramos eliminar mediante el id del ingreso y el id dado por el tamplate
    let ingresoEliminar = ingresos.findIndex(ingresos => ingresos.id === id);
    ingresos.splice(ingresoEliminar,1);
    //actualizamos la pagina
    cargarCabecero()
    //actualizamos la carga de ingresos
    cargarIngresos()

}

//falta crear las funciones relacionadas con los egresos 
//funcion cargar egresos
const cargarEgresos = () => {
    //crear variable vacia que almacene 
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgresosHtml(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

//crear funcion cearegresos
const crearEgresosHtml = (egreso) => {
    let egresoTemplate = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${(egreso.id)})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoTemplate
}

//crear la funcion que elimine a los egreso
const eliminarEgreso = (id) => {
    //creamos una variable que guarde el valor del indice que debemos buscar para poder realizar la eliminacion de un objeto seleccionado
    let egresoEliminar = egresos.findIndex(egreso => egreso.id === id);
    //usamos splice para poder eliminar el elemento mediante su indice seleccionado
    egresos.splice(egresoEliminar,1);
    //cargamos el cabecero
    cargarCabecero();
    //actualizamos la carga de egresos
    cargarEgresos();
}


//funcion agregar datos
const agregarDato = () => {
    //llamamos al formulario y lo almacenamos en una variable
    let formulario = document.forms["forma"];
    //crear una variable de nombre tipo, este llamara a los eventos de los inputa
    let tipo = formulario["tipo"]
    let descripcion = formulario["descripcion"]
    let valor = formulario["valor"]

    //crear una condicion que nos evalue si los inputs estan vacios o no
    if (descripcion.value !== "" && valor.value !== ""){
        //crear dos condiciones que indiquen que tipo de accion se realizara con respecto a la etiqueta select y las options
        if (tipo.value === 'ingreso'){
            //cargamos los eventos dentro del array correspondiente
            ingresos.push(new Ingresos(descripcion.value,+valor.value))//el signo + convierte el campo a valor numerico
            //actualizamos el cabecero
            cargarCabecero();
            //actualizmaos mediante la carga de ingresos
            cargarIngresos();
        } else if (tipo.value === 'egreso'){
            /*forma de agregar nuevas clases creadas al array de objetos, nos es la mas optima, por que no nos carga los predeterminados por los arrays
            let nuevoEgreso = new Egresos(descripcion.value,+valor.value)//el signo + convierte el campo a valor numerico
            egresos.push(nuevoEgreso);*/
            egresos.push(new Egresos(descripcion.value,+valor.value))
            //actualizar el cabecero
            cargarCabecero();
            //cargar los agresos
            cargarEgresos();
        }
    } else {
        if (descripcion.value === ""){
            descripcion.classList.add('notvalid')

        } else if (valor.value === ""){
            valor.classList.add('notvalid')    
        } else {
            alert("favor de llenar los campos de descripcion y valor")
        }
    }
    descripcion.addEventListener('keypress',() => descripcion.classList.remove('notvalid'))
    valor.addEventListener('keypress',() => valor.classList.remove('notvalid'))
    descripcion.addEventListener('mousedown',() => descripcion.classList.remove('notvalid'))

}



