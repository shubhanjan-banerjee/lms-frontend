import { ProjectRoleResponse } from "./project-role.model";
import { UserSkillResponse } from "./user-skill.model";

export interface UserResponse {
  sso_id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  id: number;
  role: string;
  current_project_role?: ProjectRoleResponse | null;
  date_joined: string;
  last_login?: string | null;
  user_skills?: UserSkillResponse[];
}

export interface UserCreate {
  sso_id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UserUpdate {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  current_project_role_id?: number | null;
}
