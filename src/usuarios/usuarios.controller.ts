import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Usuario } from 'src/usuario';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Registrar un usuario
  @Post()
  registrarUsuario(@Body() usuario: Usuario): void {
    this.usuariosService.registrarUsuario(usuario);
  }

  // Obtener un usuario por nombre de usuario
  @Get(':nombreUsuario')
  obtenerUsuarioPorNombre(@Param('nombreUsuario') nombreUsuario: string): Usuario {
    return this.usuariosService.obtenerUsuarioPorNombre(nombreUsuario);
  }

  // Obtener todos los usuarios (sin contraseñas)
  @Get()
  obtenerTodosLosUsuarios(): Array<{ nombreUsuario: string, email: string, fechaRegistro: Date, fotoPerfil?: string, seguidores?: string[], siguiendo?: Usuario[], fotosSubidas?: string }> {
    return this.usuariosService.obtenerTodosLosUsuarios();
  }


// Eliminar un usuario
@Delete(':nombreUsuario')
eliminarUsuario(@Param('nombreUsuario') nombreUsuario: string): void {
  this.usuariosService.eliminarUsuario(nombreUsuario);
}

// Editar foto de perfil
@Put(':nombreUsuario/foto')
editarFotoPerfil(
  @Param('nombreUsuario') nombreUsuario: string,
  @Body('fotoPerfil') fotoPerfil: string
): void {
  this.usuariosService.editarFotoPerfil(nombreUsuario, fotoPerfil);
}

// Seguir a un usuario
@Post(':nombreUsuarioSeguidor/seguir/:nombreUsuarioSeguido')
seguirUsuario(  
@Param('nombreUsuarioSeguidor') nombreUsuarioSeguidor: string,  
@Param('nombreUsuarioSeguido') nombreUsuarioSeguido: string
): void {
  this.usuariosService.seguirUsuario(nombreUsuarioSeguidor, nombreUsuarioSeguido);
}
}
