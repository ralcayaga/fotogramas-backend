import { Injectable } from '@nestjs/common';
import { Foto } from 'src/foto';
import { Usuario } from 'src/usuario';
import { Comentario } from 'src/comentario';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class FotosService {
  private fotos: Foto[] = [];
  private nextId = 1;

  constructor(private usuariosService: UsuariosService) {}

   // Agregar una nueva foto
   agregarFoto(
    ruta: string,
    descripcion: string,
    hashtags: string,
    fechaSubida: Date,
    nombreUsuario: string
  ): Foto {
    const usuario = this.usuariosService.obtenerUsuarioPorNombre(nombreUsuario);

    if (!usuario) {
      console.log('Usuario no encontrado');
    }

    const nuevaFoto = new Foto(
      this.nextId++,
      ruta,
      descripcion,
      hashtags,
      fechaSubida,
      usuario,
      [],
      []
    );

    this.fotos.push(nuevaFoto);

    if (!usuario.fotosSubidas) {
      usuario.fotosSubidas = [];
    }
    usuario.fotosSubidas.push(nuevaFoto.ruta);

    return nuevaFoto;
  }
  
  // Obtener una foto por ID
  obtenerFotoPorId(id: number): Foto {
    for (let i = 0; i < this.fotos.length; i++) {
      if (this.fotos[i].id === id) {
        return this.fotos[i];
      }
    }
    console.log('Foto no encontrada');
  }

  // Obtener todas las fotos de un usuario específico
  obtenerFotosPorUsuario(nombreUsuario: string): Foto[] {
    const fotosDelUsuario = [];
    for (let i = 0; i < this.fotos.length; i++) {
      if (this.fotos[i].usuario.nombreUsuario === nombreUsuario) {
        fotosDelUsuario.push(this.fotos[i]);
      }
    }
    return fotosDelUsuario;
  }


  actualizarFoto(id: number, ruta?: string, descripcion?: string, hashtags?: string): Foto {
    // Buscar la foto por ID
    const foto = this.obtenerFotoPorId(id);
    
    // Actualizar los campos si se proporcionan
    if (ruta !== undefined) {
      foto.ruta = ruta;
    }
    if (descripcion !== undefined) {
      foto.descripcion = descripcion;
    }
    if (hashtags !== undefined) {
      foto.hashtags = hashtags;
    }
    
    // Devolver la foto actualizada
    return foto;
  }

// Eliminar una foto
eliminarFoto(id: number): void {
    // Buscar el índice de la foto con el ID dado
    let fotoEncontrada = false;
    for (let i = 0; i < this.fotos.length; i++) {
      if (this.fotos[i].id === id) {
        // Eliminar la foto del arreglo
        this.fotos.splice(i, 1);
        fotoEncontrada = true;
        break;
      }
    }
    // Si no encontramos la foto, lanzar una mensaje
    if (!fotoEncontrada) {
      console.log('Foto no encontrada');
    }
  }
}
