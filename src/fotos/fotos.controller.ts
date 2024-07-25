import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { Foto } from 'src/foto';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  // Agregar una nueva foto
  @Post()
  agregarFoto(
    @Body('ruta') ruta: string,
    @Body('descripcion') descripcion: string,
    @Body('hashtags') hashtags: string,
    @Body('fechaSubida') fechaSubida: Date,
    @Body('nombreUsuario') nombreUsuario: string
  ): Foto {
    return this.fotosService.agregarFoto(ruta, descripcion, hashtags, fechaSubida, nombreUsuario);
  }

  // Obtener una foto por ID
  @Get(':id')
  obtenerFotoPorId(@Param('id') id: number): Foto {
    const foto = this.fotosService.obtenerFotoPorId(id);
    if (!foto) {
      // Mensaje de error si no se encuentra la foto
      console.log('Foto no encontrada');
    }
    return foto;
  }

  // Obtener todas las fotos de un usuario específico
  @Get('usuario/:nombreUsuario')
  obtenerFotosPorUsuario(@Param('nombreUsuario') nombreUsuario: string): Foto[] {
    return this.fotosService.obtenerFotosPorUsuario(nombreUsuario);
  }

  // Actualizar una foto
  @Put(':id')
  actualizarFoto(
    @Param('id') id: number,
    @Body('ruta') ruta?: string,
    @Body('descripcion') descripcion?: string,
    @Body('hashtags') hashtags?: string
  ): Foto {
    const foto = this.fotosService.actualizarFoto(id, ruta, descripcion, hashtags);
    if (!foto) {
      // Mensaje de error si no se encuentra la foto
      console.log('Foto no encontrada');
    }
    return foto;
  }

  // Eliminar una foto
  @Delete(':id')
  eliminarFoto(@Param('id') id: number): void {
    this.fotosService.eliminarFoto(id);
  }
}
