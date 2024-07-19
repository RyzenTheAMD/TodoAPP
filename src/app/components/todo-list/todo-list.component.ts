import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";

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

  todos: Todo[] = []

  placeholder: string = '';
  getRandomTask(): string {
    const randomIndex = Math.floor(Math.random() * this.todoItems.length);
    return this.todoItems[randomIndex];
  }

  ngOnInit(): void {
    this.placeholder = this.getRandomTask();
    this.fetchTodos()
  }

  constructor(private todoService: TodoService) {
  }

  OnAdd(value: string) {
    const todo = new Todo('-1', value, false)
    const newTodo = this.todoService.create(todo);
    this.todos.push(newTodo)
  }

  fetchTodos(){
    this.todos = this.todoService.getAll()
  }
}
