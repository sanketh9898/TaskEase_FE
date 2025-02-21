// src/app/models/task.ts
export interface Task {
    taskId?: number;
    name: string;
    description?: string;
    taskTime: string | Date;
    type: string;
    userId?: number;
}