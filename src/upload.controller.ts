import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBody } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiBody({ type: Object })
  @Post("base64")
  async crearArchivoBase64(@Body() entrada: any): Promise<string> {
    const base64 = entrada.contenido;
    const ruta = entrada.ruta;
    return await this.uploadService.uploadBase64(base64, ruta);
  }

  @ApiBody({ type: Object })
  @UseInterceptors(FileInterceptor('archivo'))
  @Post("binario")
  async crearArchivoBinario(@UploadedFile() file): Promise<string> {
    console.log(file);
    return await this.uploadService.uploadBinario(file, "archivos/nuevo.jpg");
  }

  @ApiBody({ type: Object })
  @UseInterceptors(FilesInterceptor('listaArchivos'))
  @Post("binarioMultiple")
  async crearArchivoBinarioMultiple(@UploadedFiles() files): Promise<string> {
    console.log(files);
    return await this.uploadService.uploadBinarios(files);
  }

}
