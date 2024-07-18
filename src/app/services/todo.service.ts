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
    return this.todos;
  }
}
