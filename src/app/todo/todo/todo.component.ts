import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [NgFor],
})
export class TodoComponent {

  name: WritableSignal<string> = signal('');
  content: WritableSignal<string> = signal('');
  todos: Todo[] = [];

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
    const todo = new Todo();
    todo.name = this.name();
    todo.content = this.content();
    todo.status = 'waiting';
    this.todoService.addTodo(todo);
    this.toastr.success('Todo added successfully!', 'Success');
  }
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.toastr.error('Todo deleted successfully!', 'Success');
  }
  next(todo: Todo) {
    this.todoService.nextStatus(todo);
  }
  previous(todo: Todo) {
    this.todoService.previousStatus(todo);
  }
  getByStatus(status: 'waiting' | 'in progress' | 'done') {
    return this.todoService.getByStatus(status);
  }


}
