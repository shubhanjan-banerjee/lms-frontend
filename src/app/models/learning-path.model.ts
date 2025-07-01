export interface LearningPathCourseResponse {
  id: number;
  learning_path_id: number;
  course_id: number;
  sequence_order: number;
  course: any; // You can define a CourseResponse interface for stricter typing
}

export interface LearningPathResponse {
  id: number;
  name: string;
  description?: string;
  courses: LearningPathCourseResponse[];
}

export interface UserLearningPathResponse {
  id: number;
  user_id: number;
  learning_path_id: number;
  assigned_date?: string;
  status: string;
  completion_date?: string;
  is_mandatory_by_system: boolean;
  is_registered_by_developer: boolean;
  learning_path: LearningPathResponse;
}

export interface UserCourseProgressResponse {
  id: number;
  user_id: number;
  course_id: number;
  status: string;
  progress_percentage: number;
  last_accessed?: string;
  completion_date?: string;
  course: any; // You can define a CourseResponse interface for stricter typing
}
