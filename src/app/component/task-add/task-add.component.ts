// src/app/components/task-add/task-add.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class TaskAddComponent implements OnInit {
  taskForm!: FormGroup;
    errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
      private router: Router,
      ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      taskTime: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log("task-add.component: onSubmit - Form Valid:", this.taskForm.valid); // Log form validity

    if (this.taskForm.valid) {
      const formattedTaskTime = format(new Date(this.taskForm.value.taskTime), "yyyy-MM-dd'T'HH:mm");
      const taskData = {
        ...this.taskForm.value,
        taskTime: formattedTaskTime
      };

      console.log("task-add.component: onSubmit - Task Data:", taskData); // Log the data being sent

      this.taskService.addTask(taskData).subscribe({
        next: (response) => { // Add type annotation: response: any
          console.log("task-add.component: onSubmit - Success:", response); // Log the success response
          alert('Task added successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
            this.errorMessage = error.error.error;
          console.error("task-add.component: onSubmit - Error:", error); // Log the error object
          alert(`Failed to add task: ${this.errorMessage}`);

        }
      });
    } else {
      console.log("task-add.component: onSubmit - Form Invalid"); // Log if form is invalid
    }
  }
}