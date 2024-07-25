import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";
import {find} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = [] as Todo[];

  constructor() { }

  getAll(): Todo[]{
    this.todos = JSON.parse(localStorage.getItem('todo-items') || '[]') as Todo[];
    return [...this.todos];
  }
  create(todo: Todo) : Todo{
    const id = new Date().getTime().toString();
    const updatedTodo = {...todo, id: id};
    this.todos.unshift(updatedTodo);
    this.setAll(this.todos);
    return updatedTodo;
  }

  delete(id: string)   {
    const index = this.todos.findIndex(todo => todo.id === id);
    const deletedTodo = this.todos[index]
    this.todos.splice(index, 1);
    this.setAll(this.todos)
    return deletedTodo.id
  }

  update(todo: Todo) {
    const index = this.todos.findIndex(item => item.id === todo.id);
    this.todos[index] = {...todo};
    this.setAll(this.todos);
    return this.todos[index]
  }

  private setAll(todos: Todo[]) {
    localStorage.setItem('todo-items', JSON.stringify(todos));
  }
}
