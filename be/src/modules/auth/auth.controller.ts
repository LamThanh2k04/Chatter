import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { successResponse } from 'src/common/helper/response.helper';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  @ApiOperation({
    summary: 'Đăng kí tài khoản người dùng',
    description: 'Đăng kí tài khoản người dùng với các thông tin: họ và tên, email, mật khẩu'
  })
  @ApiResponse({
    status: 409,
    description: 'Email đã tồn tại',
  })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công',
  })
  async register(@Body() registerDto: RegisterDto) {
    const data = await this.authService.register(registerDto)
    return successResponse(data, "Đăng ký thành công", 201)
  }

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập tài khoản người dùng',
    description: 'Đăng nhập tài khoản người dùng với các thông tin: email, mật khẩu'
  })
  @ApiResponse({
    status: 401,
    description: 'Email hoặc mật khẩu không đúng',
  })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
  })
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto)
    return successResponse(data, "Đăng nhập thành công", 200)
  }

}
  


