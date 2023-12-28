import { Module } from '@nestjs/common';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { FetchGet } from './use-cases/get/get-fetch';

@Module({
  imports: [
    AxiosHttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [FetchGet],
  exports: [FetchGet],
})
export class FetchModule {}
