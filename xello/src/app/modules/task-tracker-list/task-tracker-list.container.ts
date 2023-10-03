import {Component, NgModule, OnInit} from '@angular/core';
import {TasksFacadeService} from "../task-tracker/services/tasks-facade/tasks-facade.service";
import {TaskInterface} from "../task-tracker/state/tasks/interfaces/tasks.interface";
import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'task-tracker-list-container',
  templateUrl: 'task-tracker-list.container.html',
  styleUrls: ['task-tracker-list.container.scss']
})

export class TaskTrackerListContainer implements OnInit {
  taskList$: Observable<TaskInterface[]>
  constructor(private tasksFacade: TasksFacadeService) {
  }

  ngOnInit() {
    this.taskList$ = this.tasksFacade.getTaskList();
  }

  editTask(task: TaskInterface) {
    console.log('task', task);
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TaskTrackerListContainer],
  declarations: [TaskTrackerListContainer]
})
export class TaskTrackerListContainerModule {
}
