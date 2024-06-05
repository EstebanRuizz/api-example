import { PaginationDTO } from '../DTO/inner/PaginationDTO';

export interface IRepositoryAsync<T, TCreateDTO, TUpdateDTO> {
  findAll(): Promise<T[]>;
  findPaginated(pagination: PaginationDTO): Promise<T[]>;
  findById(id: string): Promise<T>;
  update(id: string, tUpdateDTO: TUpdateDTO): Promise<T>;
  delete(id: string): Promise<T>;
  create(tCreateDTO: TCreateDTO): Promise<TCreateDTO>;
}
