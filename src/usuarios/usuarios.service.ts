import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Usuario } from 'src/usuario';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];

  registrarUsuario(usuario: Usuario): void {
    // Verificar si el correo electrónico ya está en uso
    for (const user of this.usuarios) {
      if (user.email === usuario.email) {
        console.log('El correo electrónico ya está en uso');
      }
      if (user.nombreUsuario === usuario.nombreUsuario) {
        console.log('El nombre de usuario ya está en uso');
      }
    }

    // Si no existe, agregar el nuevo usuario
    this.usuarios.push(usuario);
  }


  // Obtener un usuario por nombre de usuario
  obtenerUsuarioPorNombre(nombreUsuario: string): Usuario {
    for (const user of this.usuarios) {
      if (user.nombreUsuario === nombreUsuario) {
        return user;
      }
    }
    console.log('Usuario no encontrado');
  }


// Obtener todos los usuarios (excluyendo la contraseña)
obtenerTodosLosUsuarios(): Array<{ nombreUsuario: string, email: string, fechaRegistro: Date, 
    fotoPerfil?: string, seguidores?: string[], siguiendo?: Usuario[], fotosSubidas?: string }> {
    const usuariosSinPassword = [];
    
    for (const user of this.usuarios) {
      const usuarioSinPassword = {
        nombreUsuario: user.nombreUsuario,
        email: user.email,
        fechaRegistro: user.fechaRegistro,
        fotoPerfil: user.fotoPerfil,
        seguidores: user.seguidores,
        siguiendo: user.siguiendo,
        fotosSubidas: user.fotosSubidas
      };
      
      usuariosSinPassword.push(usuarioSinPassword);
    }

    return usuariosSinPassword;
  }

  // Eliminar un usuario por nombre de usuario
  eliminarUsuario(nombreUsuario: string): void {
    const index = this.usuarios.findIndex(user => user.nombreUsuario === nombreUsuario);
    if (index === -1) {
      console.log('Usuario no encontrado');
    }
    this.usuarios.splice(index, 1);
  }

  // Editar foto de perfil
  editarFotoPerfil(nombreUsuario: string, fotoPerfil: string): void {
    const usuario = this.obtenerUsuarioPorNombre(nombreUsuario);
    usuario.fotoPerfil = fotoPerfil;
  }

  // Seguir a un usuario
  seguirUsuario(nombreUsuarioSeguidor: string, nombreUsuarioSeguido: string): void {
    const seguidor = this.obtenerUsuarioPorNombre(nombreUsuarioSeguidor);
    const seguido = this.obtenerUsuarioPorNombre(nombreUsuarioSeguido);

    // Verificar si el seguidor ya sigue al usuario
    if (seguidor.siguiendo.some(user => user.nombreUsuario === nombreUsuarioSeguido)) {
      console.log('Ya sigues a este usuario');
    }

    // Verificar si el seguidor ya está en la lista de seguidores del seguido
    if (seguido.seguidores.includes(nombreUsuarioSeguidor)) {
      console.log('El usuario ya te sigue');
    }

    // Agregar al seguidor a la lista de siguiendo
    seguidor.siguiendo.push(seguido);
    // Agregar al seguidor a la lista de seguidores del seguido
    seguido.seguidores.push(nombreUsuarioSeguidor);
  }
}
