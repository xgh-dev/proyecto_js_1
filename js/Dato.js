//crear la clase dato

class Dato {
    //crear el evento constructor que nos cree los nuevos objetos que almacenaremos en la lista
    constructor(descripcion,valor){
        //creamos los atributos de la clase, mediante this
        this._descripcion = descripcion;
        this._valor = valor;
    }
    //estableciendo los get y los set para hacer privado el constructor
    //creamos un set de descripcion que nos retorne la descripcion
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor = valor;
    }
}
