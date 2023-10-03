import {Component, ComponentFactoryResolver, NgModule, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivityManagerStore} from "../task-tracker/state/activity-manager/activity-manager.store";
import {SHOW_ADD_TASK_PANEL} from "../task-tracker/constants/activity-ids.constants";
import {Activity, ShowAddTaskPanelProp} from "../task-tracker/state/activity-manager/interfaces/activity.interface";
import {defer, Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {TasksStore} from "../task-tracker/state/tasks/tasks.store";
import {TaskInterface} from "../task-tracker/state/tasks/interfaces/tasks.interface";
import batchJson from "../../../assets/batch-tasks.json";

@Component({
  selector: 'task-tracker-control-bar-container',
  templateUrl: 'task-tracker-control-bar.container.html',
    styleUrls: ['task-tracker-control-bar.container.scss']
})

export class TaskTrackerControlBarContainer implements OnInit {
  showAddTaskPanel$: Observable<Activity<ShowAddTaskPanelProp>>;
  loadTaskTrackerControlbarAddTaskPanelContainer$: Observable<void>;
  @ViewChild('taskTrackerControlbarAddTaskPanelContainerWrapper', { read: ViewContainerRef })
  taskTrackerControlbarAddTaskPanelContainerWrapper: ViewContainerRef;
  constructor(
    private activityTrackerStore: ActivityManagerStore,
    private tasksStore: TasksStore,
    private cfr: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    this.showAddTaskPanel$ = this.activityTrackerStore.selectActivityById$(SHOW_ADD_TASK_PANEL);
    this.loadTaskTrackerControlbarAddTaskPanelContainer$ = this.loadTaskTrackerControlbarAddTaskPanelContainer();
  }

  addTask() {
    this.activityTrackerStore.upsertActivity(this.activityTrackerStore.createActivityPayload<ShowAddTaskPanelProp>(SHOW_ADD_TASK_PANEL, { show: true }));
  }

  loadTaskTrackerControlbarAddTaskPanelContainer() {
    return defer(() => {
      import('../task-tracker-control-bar-add-task-panel/task-tracker-control-bar-add-task-panel.container').then(m => {
        const factory = this.cfr.resolveComponentFactory(m.TaskTrackerControlBarAddTaskPanelContainer);
        const componentRef = this.taskTrackerControlbarAddTaskPanelContainerWrapper.createComponent(factory);
        componentRef.changeDetectorRef.detectChanges();
      })
    });
  }

  addBatch() {
    this.tasksStore.upsertTasks(batchJson as TaskInterface[]);
  }

  test() {
    const arr = [];
    let i = 0;
    while (i <= 1000) {
      const obj = {
        "id": 10000 + i,
        "title": `10000 + ${i} Oranges`,
        "description": `${i} oranges`,
        "dateCreated": new Date().toDateString(),
        "dateModified": new Date().toDateString()
      }
      arr.push(obj);
      i = i + 1;
      console.log('obj', obj);

    }
      console.log('arr', arr);

  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TaskTrackerControlBarContainer],
  declarations: [TaskTrackerControlBarContainer],
  providers: [],
})
export class TaskTrackerControlBarContainerModule {
}
