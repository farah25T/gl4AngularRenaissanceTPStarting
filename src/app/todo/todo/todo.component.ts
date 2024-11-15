import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService, NgFor],
})
export class TodoComponent {

  name: WritableSignal<string> = signal('');
  content: WritableSignal<string> = signal('');
  todos: Todo[] = [];
  todo = new Todo();

  toastr = inject(ToastrService);

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }

  setName(name: string) {
    this.name.set(name);
  }
  setContent(content: string) {
    this.content.set(content);
  }
  addTodo() {
    this.todo.name = this.name();
    this.todo.content = this.content();
    this.todo.status = 'waiting';
    this.todoService.addTodo(this.todo);
    this.toastr.success('Todo added successfully!', 'Success');
  }
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.toastr.error('Todo deleted successfully!', 'Success');
  }
  next(todo: Todo) {
    this.todoService.nextStatus(todo);
  }
  getByStatus(status: 'waiting' | 'in progress' | 'done') {
    return this.todoService.getByStatus(status);
  }


}
