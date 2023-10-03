import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {TaskTrackerControlBarContainerModule} from "../task-tracker-control-bar/task-tracker-control-bar.container";
import {TaskTrackerListContainerModule} from "../task-tracker-list/task-tracker-list.container";

@Component({
  selector: 'task-tracker-container',
  templateUrl: 'task-tracker.container.html',
  styleUrls: ['task-tracker.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskTrackerContainer implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    TaskTrackerControlBarContainerModule,
    TaskTrackerListContainerModule
  ],
  exports: [TaskTrackerContainer],
  declarations: [TaskTrackerContainer],
  providers: [],
})
export class TaskTrackerContainerModule {
}
