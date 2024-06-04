import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RoleDTO {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message: 'Name must contain only letters including tildes and spaces',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(400)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message:
      'Description must contain only letters including tildes and spaces',
  })
  description: string;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
