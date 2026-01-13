import { computed, effect, Injectable, signal } from "@angular/core";
import { Todo } from "./todo.model.js";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  todos = signal<Todo[]>([
    {
      id: 1,
      text: "First to do",
      completed: true,
    },
  ]);
  // How many todo are completed
  todosCompleted = computed(
    () => this.todos().filter((todo) => todo.completed).length
  );
  // How many todo left!
  todoLeft = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );

  // All todos
  totalTodos = computed(() => this.todos().length);

  $todos = this.todos.asReadonly();
  $comletedCount = this.todosCompleted;
  $leftCount = this.todoLeft;

  constructor() {
    effect(() => {
      localStorage.setItem("todos", JSON.stringify(this.todos()));
    });

    const saved = localStorage.getItem("todos");
    if (saved) {
      this.todos.set(JSON.parse(saved));
    }
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Math.random(),
      text: text,
      completed: false,
    };

    this.todos.update((todos) => [...todos, newTodo]);
  }

  toggleTodo(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  removeTodo(id: number) {
    this.todos.set(this.todos().filter((t) => t.id !== id));
  }
}
