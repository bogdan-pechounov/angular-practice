import { Component, Output, EventEmitter } from '@angular/core'
import { Task } from 'src/app/Task'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  text: string = ''
  day: string = ''
  reminder: boolean = false

  onSubmit() {
    if (!this.text) {
      alert('Please add a task')
      return
    }

    const { text, day, reminder } = this
    const task = { text, day, reminder }
    this.onAddTask.emit(task)

    // clear
    this.text = ''
    this.day = ''
    this.reminder = false
  }
}
