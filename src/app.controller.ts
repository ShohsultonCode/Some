import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":filename")
  async getImages(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }
}
