import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
    description: 'The password must be at least 6 characters long.',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
