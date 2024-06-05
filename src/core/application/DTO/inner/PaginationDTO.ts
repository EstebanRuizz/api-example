export class PaginationDTO {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}
