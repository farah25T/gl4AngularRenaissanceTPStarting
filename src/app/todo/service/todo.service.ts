import { computed, Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Todo[]>([]);

  waitingTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'waiting')
  );

  inProgressTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'in progress')
  );

  doneTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'done')
  );

  constructor(private loggerService: LoggerService) {}

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
   addTodo(todo: Todo): void {
    this.todos.update((todos) => [...todos, todo]);
  }
  

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    const index = this.todos().indexOf(todo);
    if (index > -1) {
      this.todos.update((todos) => todos.filter((t) => t !== todo));
      return true;
    }
    return false;
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }


  nextStatus(todo: Todo): void {
    let nextStatus: 'waiting' | 'in progress' | 'done' | null = null;
    
    switch (todo.status) {
      case 'waiting':
        nextStatus = 'in progress';
        break;
      case 'in progress':
        nextStatus = 'done';
        break;
    }
    
    if (nextStatus) {
      this.todos.update((todos) =>
        todos.map((t) => (t === todo ? { ...t, status: nextStatus } : t))
      );
    }
  }

  previousStatus(todo: Todo): void {
    let nextStatus: 'waiting' | 'in progress' | 'done' | null = null;
    
    switch (todo.status) {
      case 'in progress':
        nextStatus = 'waiting';
        break;
      case 'done':
        nextStatus = 'in progress';
        break;
    }
    
    if (nextStatus) {
      this.todos.update((todos) =>
        todos.map((t) => (t === todo ? { ...t, status: nextStatus } : t))
      );
    }
  }

  getByStatus(status: 'waiting' | 'in progress' | 'done'): Todo[] {
    switch (status) {
      case 'waiting':
        return this.waitingTodos();
      case 'in progress':
        return this.inProgressTodos();
      case 'done':
        return this.doneTodos();
      default:
        return [];
    }
  }
}
