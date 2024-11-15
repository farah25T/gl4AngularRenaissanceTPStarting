export class Todo {
  constructor(
    public name = '', 
    public content = '',
    public status: 'waiting' | 'in progress' | 'done' = 'waiting',
  ) {}
}
