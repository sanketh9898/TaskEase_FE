import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { format, parseISO } from 'date-fns';
import { CommonModule } from '@angular/common';
// Removed: import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule]
  
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;
  task!: Task;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    // Removed: private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      taskTime: ['', Validators.required],
      type: ['', Validators.required]
    });

    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(Number(taskId)).subscribe(task => {
          this.task = task;
          // Format the date for the datetime-local input
          const formattedDate = format(parseISO(task.taskTime.toString()), "yyyy-MM-dd'T'HH:mm");
          this.taskForm.patchValue({
              name: task.name,
              description: task.description,
              taskTime: formattedDate,
              type: task.type
            });
      });
    }
  }
  // src/app/components/task-edit/task-edit.component.ts

  onSubmit(): void {
    if (this.taskForm.valid) {
       // Format the date to ISO string before sending to the backend.
      const formattedTaskTime = format(new Date(this.taskForm.value.taskTime), "yyyy-MM-dd'T'HH:mm");
        const updatedTask: Task = {
            ...this.taskForm.value,
            taskId: this.task.taskId,
            taskTime: formattedTaskTime,
        };
        console.log("Task Data:", updatedTask); //Added console

      this.taskService.updateTask(updatedTask).subscribe({
        next: (response) => {  // Add type annotation: response: any
          console.log("task-edit.component: onSubmit - Success:", response); // Add this line
          alert('Task updated successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
            console.log("Error Object",error);
            this.errorMessage = error.error.error; // Access error message correctly
          alert(`Failed to update task: ${this.errorMessage}`);
          console.error("Error updating task:", error);
        }
    });
    }
  }
}