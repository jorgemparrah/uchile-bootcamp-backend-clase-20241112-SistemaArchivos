import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirController } from './dir.controller';
import { DirService } from './dir.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './archivos',
      serveRoot: '/estaticos',
    }),
  ],
  controllers: [AppController, DirController, UploadController],
  providers: [AppService, DirService, UploadService],
})
export class AppModule {}
