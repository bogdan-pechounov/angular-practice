import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { UiService } from 'src/app/services/ui.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Task Tracker'
  showAddTask!: boolean
  subscription: Subscription

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((v) => (this.showAddTask = v))
  }

  toggleAddTask() {
    this.uiService.toggleAddTask()
  }

  hasRoute(route: string) {
    return this.router.url === route
  }
}
