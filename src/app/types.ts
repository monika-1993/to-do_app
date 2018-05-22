export interface Subtask {
  id: number;
  name: string;
  isCompleted: boolean;
  lastUpdated: Date;
}

export interface Task extends Subtask {
  description?: string;
  priority: Priority;
  subtasks: Subtask[];
}

export enum Priority {
  high,
  medium,
  low,
};
