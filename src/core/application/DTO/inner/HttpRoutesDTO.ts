export class HttpRoutesDTO {
  constructor(
    public readonly path: string,
    public readonly method: string,
    public readonly entityName: string,
  ) {}
}
