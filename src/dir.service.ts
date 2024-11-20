import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as FS } from 'fs';

@Injectable()
export class DirService {

  async crear(ruta : string): Promise<string> {
    const p = ruta.split('').join('/');
    const rutaDirectorio = `./2024/${p}/imagenes/2024`;
    try {
      await FS.mkdir(rutaDirectorio, { recursive: true });
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el directorio');
    }
    return rutaDirectorio;
  }

  async eliminar(ruta : string): Promise<string> {
    try {
      await FS.rm(`./${ruta}`, { recursive: true });
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al eliminar el directorio');
    }
    return ruta;
  }

  async chown(ruta : string, idUsuario: number, idGrupo: number): Promise<string> {
    try {
      await FS.chown(`./${ruta}`, idUsuario, idGrupo);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException(`Error al cambiar propietario del directorio (${ruta})`);
    }
    return ruta;
  }

  async chmod(ruta : string): Promise<string> {
    try {
      await FS.chmod(ruta, 0o531);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al cambiar permisos del archivo o directorio');
    }
    return ruta;
  }

  async otros(ruta : string): Promise<string> {
    try {
      // ABRIR UN ARCHIVO
      const archivo = await FS.open(ruta, 'w');

      // ABRIR UN DIRECTORIO
      const directorio = await FS.opendir(ruta);
      
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al cambiar permisos del archivo o directorio');
    }
    return ruta;
  }

}
