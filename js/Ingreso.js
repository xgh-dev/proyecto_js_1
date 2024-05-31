//crear la clase ingreso
//export default Ingresos;

class Ingresos extends Dato{
    //crear una variable estatica que sea un contador
    static contadorIngreso = 0;
    constructor(descripcion,valor){
        //indicar la herencia
        super(descripcion,valor);
        //definir una propiedad id con get
        this._id =++ Ingresos.contadorIngreso;
    }
    //solo establecer un get para tener un unico id
    get id(){
        return this._id;
    }
}