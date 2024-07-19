import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = [
    new Todo( '1', 'Go to gym', true),
    new Todo( '2', 'Install game', false),
    new Todo( '3', 'Send email', true)
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
}
