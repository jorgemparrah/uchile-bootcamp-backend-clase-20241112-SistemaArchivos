import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as FS } from 'fs';

@Injectable()
export class AppService {

  async crearArchivoWrite(): Promise<string> {
    const rutaArchivo = '/archiv/prueba/jpg/2024/11/14/archivo.txt';
    const ultimoSlash = rutaArchivo.lastIndexOf('/');
    const rutaDirectorio = rutaArchivo.substring(0, ultimoSlash);
    const contenido = 'Write';
    try {
      await FS.mkdir(rutaDirectorio, { recursive: true });
      await FS.writeFile(rutaArchivo, contenido);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async crearArchivoAppendA(): Promise<string> {
    const rutaArchivo = '/var/archivo.txt';
    const contenido = 'ContenidoAgregado';
    try {
      // await FS.appendFile(rutaArchivo, contenido, { flag: 'a' });
      await FS.appendFile(rutaArchivo, contenido);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async crearArchivoAppendW(): Promise<string> {
    const rutaArchivo = './archivos/archivo.json';
    const contenido = {
      nombre: 'Adrian',
      apellido: 'Eguez'
    };
    try {
      await FS.appendFile(rutaArchivo, JSON.stringify(contenido, null, 2), { flag: 'w' });
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async crearArchivoOpenWrite(): Promise<string> {
    const rutaArchivo = './archivos/archivo.txt';
    try {
      const archivoAbierto = await FS.open(rutaArchivo, 'a');
      const lista = [ '\t   Linea1', 'Linea2', 'Linea3', "Proceso1", "Proceso2", "Proceso3" ];
      for (const linea of lista) {
        await archivoAbierto.write(linea + '\n');
      }
      await archivoAbierto.close();
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async read(): Promise<string> {
    const rutaArchivo = './archivos/archivo.txt';
    try {
      const buffer = await FS.readFile(rutaArchivo);
      const contenido = buffer.toString();
      return contenido;
      /* PARA REEMPLAZAR ALGO SE DEBE MANUPULAR EL STRING DEL CONTENIDO */
      /*
      const contenidoNuevo = contenido.replace('te', 'PRUEBA');
      await FS.writeFile(rutaArchivo, contenidoNuevo);
      */
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
  }

  async readBase64(): Promise<string> {
    const rutaArchivo = './archivos/ubuntu.jpg';
    try {
      const buffer = await FS.readFile(rutaArchivo);
      const contenido = buffer.toString('base64');
      return contenido;
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
  }

  async crearArchivoBase64(contenidoBase64: string): Promise<string> {
    const rutaArchivo = './archivos/archivo.jpg';
    try {
      await FS.writeFile(rutaArchivo, contenidoBase64, { encoding: 'base64' });
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async rename(rutaActual: string, rutaNueva: string ): Promise<string> {
    try {
      await FS.rename(rutaActual, rutaNueva);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaNueva;
  }

  async copy(rutaActual: string, rutaNueva: string ): Promise<string> {
    try {
      await FS.copyFile(rutaActual, rutaNueva);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaNueva;
  }

  async remove(rutaActual: string): Promise<string> {
    try {
      await FS.unlink(rutaActual);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaActual;
  }
}
