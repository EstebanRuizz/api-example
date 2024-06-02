import { IsNotEmpty, IsUUID } from 'class-validator';

export class EntitiesByRoleDTO {
  @IsNotEmpty()
  @IsUUID()
  roleFK: string;

  @IsNotEmpty()
  @IsUUID()
  entityFK: string;
}
