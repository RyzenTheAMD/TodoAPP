import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = [
    new Todo( '1', 'Go to gym', true, false),
    new Todo( '2', 'Install game', false, false),
    new Todo( '3', 'Send email', false, false)
  ];
  constructor() { }

  getAll(){
    return [...this.todos];
  }
  create(todo: Todo) : Todo{
    const id = new Date().getDate().toString();
    const updatedTodo = {...todo, id: id};
    this.todos.push(updatedTodo);
    return updatedTodo;
  }

  delete(id: string)   {
    const index = this.todos.findIndex(todo => todo.id === id);
    const deletedTodo = this.todos[index]
    this.todos.splice(index, 1);
    return deletedTodo.id
  }
}
