import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import configModule from './common/config/config.module';

@Module({
  imports: [configModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
