import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import response from './utils/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }

  @Post('login')
  async login(@Body('token') token, @Res() res: Response): Promise<any> {
    const controller = 'Login with google';
    try {
      const loginPayload = await this.appService.login(token);

      res.json(response(`${controller} Success`, loginPayload, true, 200));
    } catch (error) {
      res.json(
        response(
          `${controller} Failed`,
          { errors: [error.message] },
          false,
          400,
        ),
      );
    }
  }
}
