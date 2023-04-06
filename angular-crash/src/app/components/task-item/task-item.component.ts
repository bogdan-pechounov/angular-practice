import { Component, EventEmitter, Input, Output } from '@angular/core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Task } from 'src/app/Task'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: Task
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes

  onDelete() {
    this.onDeleteTask.emit(this.task)
  }
}
