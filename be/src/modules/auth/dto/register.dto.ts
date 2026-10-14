import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";


export class RegisterDto {
    @ApiProperty({
        example: 'Nguyễn Văn A',
        description: 'Họ và tên người dùng'
    })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
    @IsString({ message: 'Tên người dùng phải là một chuỗi' })
    name!: string

    @ApiProperty({
        example: 'nguyenvana@gmail.com',
        description: 'Email người dùng'
    })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'Email người dùng không được để trống' })
    @IsString({ message: 'Email người dùng phải là một chuỗi' })
    @IsEmail({}, { message: 'Email người dùng không hợp lệ' })
    email!: string

    @ApiProperty({
        example:'123456',
        description: 'Mật khẩu người dùng'
    })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'Mật khẩu người dùng không được để trống' })
    @IsString({ message: 'Mật khẩu người dùng phải là một chuỗi' })
    @MinLength(6, { message: 'Mật khẩu người dùng phải có ít nhất 6 ký tự' })
    password!: string
}