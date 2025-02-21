// src/app/component/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null; // Track the selected task

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
  }

  closeDetails(): void {
    this.selectedTask = null;
  }
  editTask(id: number | undefined): void {
    if(id){
        this.router.navigate(['/edit-task', id]);
    }
  }

    deleteTask(id: number | undefined): void {
        if(id){
            if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.deleteTask(id).subscribe({
                next:() => {
                alert('Task deleted successfully!');
                this.selectedTask = null;
                this.loadTasks(); // Reload tasks after deletion
                },
                error:(error) => {
                    alert('Failed to delete task.');
                    console.error("Error deleting task:", error)}
            });
            }
        }
    }
    goToAddTask(){
        this.router.navigate(['/add-task']);
    }
}