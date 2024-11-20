import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as FS } from 'fs';

@Injectable()
export class UploadService {

  async uploadBase64(contenidoBase64: string, ruta: string): Promise<string> {
    const rutaArchivo = `./${ruta}`;
    try {
      await FS.writeFile(rutaArchivo, contenidoBase64.split(",")[1], { encoding: 'base64' });
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async uploadBinario(file, ruta: string): Promise<string> {
    const rutaArchivo = `./${ruta}`;
    try {
      await FS.writeFile(rutaArchivo, file.buffer);
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

  async uploadBinarios(files: any[]): Promise<string> {
    const rutaArchivo = `./archivos`;
    try {
      for(const file of files) {
        const extension = file.originalname.split('.')[1];
        const nuevoDirectorio = `${rutaArchivo}/${extension}`;
        const nombreArchivo = file.originalname;
        await FS.mkdir(nuevoDirectorio, { recursive: true });
        const nuevaRuta = `${nuevoDirectorio}/${nombreArchivo}`;
        await FS.writeFile(nuevaRuta, file.buffer);
        const rutaPublica = `/estaticos/${extension}/${nombreArchivo}`;
        console.log(nuevaRuta);
        console.log(rutaPublica);
      }
    } catch (error) {
      console.error('Error:', error);
      throw new BadRequestException('Error al crear el archivo');
    }
    return rutaArchivo;
  }

}
