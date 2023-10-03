import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {ActivityManagerStore} from "../task-tracker/state/activity-manager/activity-manager.store";
import {SHOW_ADD_TASK_PANEL} from "../task-tracker/constants/activity-ids.constants";
import {TasksStore} from "../task-tracker/state/tasks/tasks.store";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'task-tracker-control-bar-add-task-panel-container',
  templateUrl: 'task-tracker-control-bar-add-task-panel.container.html',
  styleUrls: ['task-tracker-control-bar-add-task-panel.container.scss'],
  providers: [
    FormBuilder
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskTrackerControlBarAddTaskPanelContainer {
  addTaskFormGroup = this.formBuilder.group({
    title: this.formBuilder.control('', {
      validators: Validators.required
    }),
    description: this.formBuilder.control('', {
      validators: Validators.required
    }),
  });

  showAddTaskPanelFalse = this.activityManagerStore.createActivityPayload(SHOW_ADD_TASK_PANEL, {
    show: false
  });

  constructor(
    private activityManagerStore: ActivityManagerStore,
    private tasksStore: TasksStore,
    private formBuilder: FormBuilder
  ) {
  }

  add() {
    this.addTaskFormGroup.markAllAsTouched();
    if (this.addTaskFormGroup.valid) {
      this.tasksStore.upsertTask({ ...this.addTaskFormGroup.value });
      this.activityManagerStore.upsertActivity(this.showAddTaskPanelFalse);
    }
  }

  cancel() {
    this.activityManagerStore.upsertActivity(this.showAddTaskPanelFalse);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [TaskTrackerControlBarAddTaskPanelContainer],
  declarations: [TaskTrackerControlBarAddTaskPanelContainer],
  providers: [],
})
export class TaskTrackerControlBarAddTaskPanelContainerModule {
}
