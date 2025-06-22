export interface SkillResponse {
  id: number;
  name: string;
  description?: string | null;
}

export interface SkillCreate {
  name: string;
  description?: string | null;
}
