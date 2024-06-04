import { InfrastructureDTO } from '../DTO/http/infrastructureDTO';

export interface IGeneralInfrastructure {
  // for example, load elastic search indexes when creating a new instance
  getHealth(): Promise<object[]>;
  postApiConfig(infrastructureDTO: InfrastructureDTO): Promise<object>;
}
