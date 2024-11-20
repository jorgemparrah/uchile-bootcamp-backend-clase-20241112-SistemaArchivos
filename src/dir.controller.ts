import { Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { DirService } from './dir.service';

@Controller("dir")
export class DirController {
  constructor(private readonly dirService: DirService) {}

  @Post("mkdir/:ruta")
  async crear(@Param("ruta") ruta : string): Promise<string> {
    return await this.dirService.crear(ruta);
  }

  @Delete("rmdir/:ruta")
  async eliminar(@Param("ruta") ruta : string): Promise<string> {
    return await this.dirService.eliminar(ruta);
  }

  @Patch("chown/:idUsuario/:idGrupo/:ruta")
  async chown(@Param("idUsuario") idUsuario : string, @Param("idGrupo") idGrupo : string, @Param("ruta") ruta : string): Promise<string> {
    return await this.dirService.chown(ruta, +idUsuario, +idGrupo);
  }

  @Patch("chmod/:ruta")
  async chmod(@Param("ruta") ruta : string): Promise<string> {
    return await this.dirService.chmod(ruta);
  }

}
