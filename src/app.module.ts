import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PetsService } from './pets/pets.service';
import { PetsService } from './pets/pets.service';

@Module({
  imports: [UsuariosModule],
  controllers: [AppController],
  providers: [AppService, PetsService],
})
export class AppModule {}
