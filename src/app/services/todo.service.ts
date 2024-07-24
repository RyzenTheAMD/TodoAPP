import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = [] as Todo[];
  constructor() { }

  getAll(){
    return [...this.todos];
  }
  create(todo: Todo) : Todo{
    const id = new Date().getTime().toString();
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

  update(todo: Todo) {
    const index = this.todos.findIndex(item => item.id === todo.id);
    this.todos[index] = {...todo};
    return this.todos[index]
  }
}
