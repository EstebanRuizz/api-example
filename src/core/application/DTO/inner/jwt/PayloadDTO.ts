import { Guid } from 'guid-typescript';

export class PayloadDTO {
  public jwtSessionId: Guid;
  public iat: number;
  public exp: number;
}
