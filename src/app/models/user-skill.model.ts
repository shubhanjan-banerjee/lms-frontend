export interface UserSkillResponse {
  id: number;
  user_id: number;
  skill_id: number;
  proficiency_level_id: number;
}

export interface UserSkillCreate {
  user_id: number;
  skill_id: number;
  proficiency_level_id: number;
}
