import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  // List of tasks
  todoItems: string[] = [
    'Complete report',
    'Review code',
    'Update documentation',
    'Attend meeting',
    'Send email',
    'Go to GYM'
  ];
  placeholder: string = '';
  todos = [
    new Todo( '1', 'Go to gym', false),
  ];


  getRandomTask(): string {
    const randomIndex = Math.floor(Math.random() * this.todoItems.length);
    return this.todoItems[randomIndex];
  }

  ngOnInit(): void {
    this.placeholder = this.getRandomTask();
  }
}
