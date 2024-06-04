export class InfrastructureDTO {
  public readonly userEmail: string;
  public readonly userPassword: string;
  public readonly roleName: string;
  public readonly roleDescription: string;

  constructor(
    userEmail: string,
    userPassword: string,
    roleName: string,
    roleDescription: string,
  ) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.roleName = roleName;
    this.roleDescription = roleDescription;
  }
}
