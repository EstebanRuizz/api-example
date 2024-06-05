import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateEntitiesDTO {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message: 'entityName must contain only letters including tildes and spaces',
  })
  public entityName: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message:
      'entityRoute must contain only letters including tildes and spaces',
  })
  public entityRoute: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message:
      'entityMethod must contain only letters including tildes and spaces',
  })
  public entityMethod: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, {
    message:
      'concatenatedEndPoint must contain only letters including tildes and spaces',
  })
  public concatenatedEndPoint: string;
}
