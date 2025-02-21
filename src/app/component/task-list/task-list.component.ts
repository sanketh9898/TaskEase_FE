import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Removed: import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true, // THIS IS IMPORTANT
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router, /* Removed: private snackBar: MatSnackBar */) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  editTask(id: number): void {
    this.router.navigate(['/edit-task', id]);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next:() => {
          // Removed: this.snackBar.open(...)
          alert('Task deleted successfully!'); // Use alert
          this.loadTasks();
        },
        error:(error) => {
            // Removed: this.snackBar.open(...)
            alert('Failed to delete task.');
            console.error("Error deleting task:", error)}
    });
    }
  }
}