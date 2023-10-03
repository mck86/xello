import {Component, NgModule, OnInit} from '@angular/core';
import {TasksFacadeService} from "../task-tracker/services/tasks-facade/tasks-facade.service";
import {TaskInterface} from "../task-tracker/state/tasks/interfaces/tasks.interface";
import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivityManagerStore} from "../task-tracker/state/activity-manager/activity-manager.store";
import {TASK_EDIT_MODE} from "./constants/activity-ids.constants";
import {
  Activity,
  TaskEditMode
} from "../task-tracker/state/activity-manager/interfaces/activity.interface";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'task-tracker-list-container',
  templateUrl: 'task-tracker-list.container.html',
  styleUrls: ['task-tracker-list.container.scss']
})

export class TaskTrackerListContainer implements OnInit {
  taskListFormGroup = this.formBuilder.group({
    tasks: this.formBuilder.array([])
  })
  taskList$: Observable<TaskInterface[]>;
  editModeIds$: Observable<Activity<TaskEditMode>>;
  constructor(
      private tasksFacade: TasksFacadeService,
      private formBuilder: FormBuilder,
      private activityManagerStore: ActivityManagerStore
  ) {
  }

  get tasks() {
    return this.taskListFormGroup.controls['tasks'] as FormArray;
  }

  ngOnInit() {
    this.taskList$ = this.tasksFacade.getTaskList();
    this.editModeIds$ = this.activityManagerStore.selectActivityById$<TaskEditMode>(TASK_EDIT_MODE).pipe(
        tap(data => console.log('data', data))
    );
    this.taskList$.subscribe(taskList => {
      this.tasks.clear();
      taskList.forEach(taskItem => {
        const { id, title, description } = taskItem;

        const newFormGroup = this.formBuilder.group({
          id: this.formBuilder.control(id, { validators: Validators.required }),
          title: this.formBuilder.control(title, { validators: Validators.required }),
          description: this.formBuilder.control(description, { validators: Validators.required })
        })

        this.tasks.push(newFormGroup);
      })
    })
  }

  editTask(index: number, ids: any) {
    console.log('ids', ids);
    const props = !!ids ? { ...ids } : {};
    props[index] = index;
    this.activityManagerStore.upsertActivity(this.activityManagerStore.createActivityPayload(TASK_EDIT_MODE, {
      ...props
    }))
    console.log('task', this.tasks.at(index));
  }

  getTaskId(_: any, item: any) {
    return item.id;
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TaskTrackerListContainer],
  declarations: [TaskTrackerListContainer]
})
export class TaskTrackerListContainerModule {
}
