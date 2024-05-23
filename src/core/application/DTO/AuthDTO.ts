import {
  IsEmail,
  MaxLength,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(80)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s!@#$%^&*(),.?":{}|<>]+$/, {
    message: 'password must contain only letters including tildes and spaces',
  })
  password: string;
}
