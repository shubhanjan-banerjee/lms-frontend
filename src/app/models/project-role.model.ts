export interface ProjectRoleResponse {
  id: number;
  name: string;
  description?: string | null;
}

export interface ProjectRoleCreate {
  name: string;
  description?: string | null;
}
