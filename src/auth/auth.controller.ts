import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDTO: SignupDto) {
    console.log(signupDTO);
    return this.authService.signup(signupDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDto) {
    console.log(loginDTO);
    return this.authService.login(loginDTO);
  }
}
