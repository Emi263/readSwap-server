import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: { email: string, password: string }) {
    return this.authService.signUpUser(email, password);
  }


  @Get("/")
  async test() {
    return "wow";
  }
}
