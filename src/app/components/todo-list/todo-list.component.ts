import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import {find} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    FormsModule
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
    'Go to GYM',
    "Finish homework",
    "Buy groceries",
    "Call mom",
    "Go for a run",
    "Read a book",
    "Clean the garage",
    "Cook dinner",
    "Attend meeting at work",
    "Practice coding",
    "Water the plants",
    "Pay bills",
    "Do laundry",
    "Schedule dentist appointment",
    "Watch a movie",
    "Write blog post",
    "Organize closet",
    "Take out the trash",
    "Review notes",
    "Plan weekend getaway",
    "Learn a new recipe",
    "Exercise for 30 minutes",
    "Send thank you cards",
    "Volunteer at local shelter",
    "Check email",
    "Create budget",
    "Study for exam",
    "Walk the dog",
    "Listen to podcast",
    "Clean out inbox",
    "Update resume",
    "Set goals for the month",
    "Read news",
    "Shop for birthday gift",
    "Practice meditation",
    "Fix leaking faucet",
    "Research vacation destinations",
    "Join online course",
    "Write in journal",
    "Prepare for presentation",
    "Call a friend",
    "Update social media profiles",
    "Start book club",
    "Review insurance policies",
    "Explore new neighborhood",
    "Attend yoga class",
    "Check bank balance",
    "Paint a picture",
    "Declutter desk",
    "Create music playlist",
    "Repair bicycle",
    "Attend networking event",
    "Visit library",
    "Plan home improvement project",
    "Donate old clothes",
    "Watch tutorial videos",
    "Write thank you notes",
    "Practice a musical instrument",
    "Research investment options",
    "Organize digital files",
    "Try a new restaurant",
    "Visit museum",
    "Write poetry",
    "Update software",
    "Buy new shoes",
    "Sort through old photos",
    "Call customer service",
    "Plan family gathering",
    "Attend webinar",
    "Learn basic first aid",
    "Read bedtime story to kids",
    "Practice a foreign language",
    "Review insurance policies",
    "Try new workout routine",
    "Create a budget spreadsheet",
    "Explore local farmers market",
    "Set up home office",
    "Attend local community event",
    "Visit art gallery",
    "Research household appliances",
    "Learn about local history",
    "Write a short story",
    "Explore nature trail",
    "Visit botanical garden",
    "Attend online workshop",
    "Try a new hobby",
    "Create a vision board",
    "Practice mindfulness",
    "Visit a new coffee shop",
    "Read inspirational quotes",
    "Join a fitness class",
    "Organize digital photos",
    "Learn to knit",
    "Plan next vacation",
    "Attend virtual conference",
    "Write a blog",
    "Research career opportunities",
    "Try a new skincare routine",
    "Create a family tree",
    "Read a biography",
    "Visit a thrift store",
    "Plan a surprise",
    "Attend local theater performance",
    "Write a song",
    "Try a DIY project"
  ];
  todos: Todo[] = []
  onGoingEdit: boolean = false;


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

  OnAdd(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if(value.length == 0 ) return
    const todo = new Todo('-1', value, false, false)
    const newTodo = this.todoService.create(todo);
    this.todos.unshift(newTodo)
    inputElement.value = ''
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
    if(!this.onGoingEdit) {
      todo.isEditing = true
    }
    this.onGoingEdit = true
  }

  OnSave(todo: Todo, title : string) {
    todo.title = title
    todo.isEditing = false
    this.updateTodo(todo)
    this.onGoingEdit = false
  }

  OnCancel(todo: Todo) {
    todo.isEditing = false
    const index = this.todos.findIndex(item => item.id === todo.id);
    this.todos[index] = {...this.todos[index]}
    this.onGoingEdit = false
  }

  onDoneChange(todo: Todo) {
    this.updateTodo(todo)
  }

  private updateTodo(todo: Todo) {
    const updatedTodo = this.todoService.update(todo)
    if(updatedTodo){
      const index = this.todos.findIndex(item => item.id === updatedTodo.id);
      this.todos[index] = {...updatedTodo}
    }
  }
}
