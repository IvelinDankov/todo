import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TodoService } from "./todo.service.js";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "todo";
  todoService = inject(TodoService);
  newText = "";

  addTodo(form: NgForm) {
    const text = form.controls["newText"].value;
    this.todoService.addTodo(text);
    this.newText = "";
  }
}
