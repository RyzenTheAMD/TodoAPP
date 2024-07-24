import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import {find} from "rxjs";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [
    NgForOf,
    NgClass,
    NgIf
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
    const todo = new Todo('-1', value, false, false)
    const newTodo = this.todoService.create(todo);
    this.todos.push(newTodo)
  }
  OnDelete(id: string) {
    if (confirm('Are you sure you want to delete it?')) {
      const DeletedTodo = this.todoService.delete(id)
      if (DeletedTodo) {
        const index = this.todos.findIndex(todo => todo.id === id)
        this.todos.splice(index, 1);
      }
    }
  }

  fetchTodos(){
    this.todos = this.todoService.getAll()
  }

  OnEdit(todo: Todo) {
    todo.isEditing = true
  }

  OnSave(todo: Todo, title : string) {
    todo.title = title
    todo.isEditing = false
    const updatedTodo = this.todoService.update(todo)
    if(updatedTodo){
      const index = this.todos.findIndex(item => item.id === updatedTodo.id);
      this.todos[index] = {...updatedTodo}
    }
  }

  OnCancel(todo: Todo) {
    todo.isEditing = false
    const index = this.todos.findIndex(item => item.id === todo.id);
    this.todos[index] = {...this.todos[index]}
  }

  private findById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id)
  }
}
