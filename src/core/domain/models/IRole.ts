export interface IRole {
  id: string;
  name: string;
  description: string;
}

export interface IEntities {
  id: string;
  entityName: string;
  entityRoute: string;
  entityMethod: string;
}

export interface IEntitiesByRole {
  id: string;
  roleFK: string;
  entitiesFK: string;
}
