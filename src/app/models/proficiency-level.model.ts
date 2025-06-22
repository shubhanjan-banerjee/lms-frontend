export interface ProficiencyLevelResponse {
  id: number;
  name: string;
  description?: string | null;
}

export interface ProficiencyLevelCreate {
  name: string;
  description?: string | null;
}
