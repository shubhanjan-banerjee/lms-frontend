export interface UserSkillResponse {
  id: number;
  user_id: number;
  skill_id: number;
  proficiency_level_id: number;
  skill_name?: string;
  proficiency_level_name?: string;
}

export interface UserSkillCreate {
  user_id: number;
  skill_id: number;
  proficiency_level_id: number;
}
