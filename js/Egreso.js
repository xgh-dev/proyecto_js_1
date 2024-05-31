//crea la clase Egresos
//export default Egresos;

class Egresos extends Dato{
    //las variables estaticas solo se pueden usar en la clase donde se crean
    static contadorEgreso = 0;
    //definir los atributos y realizar la herencia
    constructor(descripcion,valor){
        super(descripcion,valor);
        //crear un get para el id que estaremos utilizando
        this._id =++ Egresos.contadorEgreso;
    }
    //establecer el elemento get que nos permita tener un solo id sin que se modifique
    get id(){
        return this._id;
    }
}