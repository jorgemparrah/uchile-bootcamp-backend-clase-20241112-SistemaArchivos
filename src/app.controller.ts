import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("write")
  async crearArchivoWrite(): Promise<string> {
    return await this.appService.crearArchivoWrite();
  }

  @Post("append-a")
  async crearArchivoAppendA(): Promise<string> {
    return await this.appService.crearArchivoAppendA();
  }

  @Post("append-w")
  async crearArchivoAppendW(): Promise<string> {
    return await this.appService.crearArchivoAppendW();
  }

  @Post("open-write")
  async crearArchivoOpenWrite(): Promise<string> {
    return await this.appService.crearArchivoOpenWrite();
  }

  @Get("read")
  async read(): Promise<string> {
    return await this.appService.read();
  }

  @Get("read-base64")
  async readBase64(): Promise<string> {
    return await this.appService.readBase64();
  }

  @ApiBody({ type: Object })
  @Post("write-base64")
  async crearArchivoBase64(@Body() entrada: any): Promise<string> {
    const base64 = entrada.contenido;
    return await this.appService.crearArchivoBase64(base64);
  }

  @ApiBody({ type: Object })
  @Patch("rename")
  async rename(@Body() body: any): Promise<string> {
    const rutaActual : string = body.rutaActual;
    const nuevaRuta : string = body.nuevaRuta;
    return await this.appService.rename(rutaActual, nuevaRuta);
  }

  @ApiBody({ type: Object })
  @Patch("copy")
  async copy(@Body() body: any): Promise<string> {
    const rutaActual : string = body.rutaActual;
    const nuevaRuta : string = body.nuevaRuta;
    return await this.appService.copy(rutaActual, nuevaRuta);
  }

  @ApiBody({ type: Object })
  @Post("remove")
  async remove(@Body() body: any): Promise<string> {
    const rutaActual : string = body.rutaActual;
    return await this.appService.remove(rutaActual);
  }
}
