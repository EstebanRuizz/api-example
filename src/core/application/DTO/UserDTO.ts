import {
  IsEmail,
  IsNotEmpty,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message: 'Name must contain only letters including tildes and spaces',
  })
  name: string;

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

  @IsNotEmpty()
  @IsUUID()
  roleFK: string;
}
