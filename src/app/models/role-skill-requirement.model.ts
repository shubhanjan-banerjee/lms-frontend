export interface RoleSkillRequirementResponse {
  id: number;
  project_role_id: number;
  skill_id: number;
  min_proficiency_level_id: number;
  is_mandatory: boolean;
}

export interface RoleSkillRequirementCreate {
  project_role_id: number;
  skill_id: number;
  min_proficiency_level_id: number;
  is_mandatory?: boolean;
}
