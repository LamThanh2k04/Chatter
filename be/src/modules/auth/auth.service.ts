import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }
    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto
        console.log(email, password)
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: email }
        })
        if (existingEmail) {
            throw new ConflictException("Email đã tồn tại")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.prisma.user.create({
            data: {
                ...registerDto,
                password: hashedPassword
            }
        })
        return user
    }
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto
        const user = await this.prisma.user.findUnique({
            where: { email: email }
        })
        console.log('email: ', email )
         console.log('user: ', user )
        if (!user) {
            throw new UnauthorizedException("Email hoặc mật khẩu không đúng")
        }

        const isMatchedPassword = await bcrypt.compare(password, user.password)
        if (!isMatchedPassword) {
            throw new UnauthorizedException("Email hoặc mật khẩu không đúng")
        }

        const payload = {
            sub: user.id,
            role: user.role
        }
        const { password: _, ...safeUser } = user
        const token = await this.jwt.signAsync(payload)
        return {
            accessToken: token,
            user : safeUser 
        }
    }
}
