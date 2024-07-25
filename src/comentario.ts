import { Usuario } from './usuario';

export class Comentario{

    constructor(

       public id: number,
       public texto: string,
       public fecha: Date,
       public usuario: Usuario

    ){}

}