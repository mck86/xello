import {Injectable} from '@angular/core';
import {createEntityAdapter, Dictionary, EntityState} from "@ngrx/entity";
import {TaskInterface} from "./interfaces/tasks.interface";
import {ComponentStore} from "@ngrx/component-store";
import {Observable} from "rxjs";

export interface TasksStateInterface extends EntityState<TaskInterface> {}

const taskAdapter = createEntityAdapter<TaskInterface>();
const initialState = taskAdapter.getInitialState();

const { selectAll, selectEntities } = taskAdapter.getSelectors();

@Injectable({ providedIn: 'root' })
export class TasksStore extends ComponentStore<TasksStateInterface> {
  constructor() {
    super(initialState);
  }

  readonly addTask = this.updater((state, task: TaskInterface) => {
    return taskAdapter.addOne(task, state);
  });

  readonly removeTask = this.updater((state, id: string) => {
    return taskAdapter.removeOne(id, state);
  });

  readonly upsertTask = this.updater((state, task: TaskInterface) => {
    let id, dateCreated, dateModified;
    if (!task.id) {
      id = Math.floor(Math.random()*90000) + 10000;
      let duplicateId = !!state.entities[id];;
      while (duplicateId) {
        id = Math.floor(Math.random()*90000) + 10000;
        duplicateId = !!state.entities[id];
      }
    }
    if (!task.dateCreated) {
      dateCreated = new Date().toDateString();
    } else {
      dateCreated = task.dateCreated;
    }
    dateModified = new Date().toDateString();
    return taskAdapter.upsertOne({
      ...task,
      id,
      dateCreated,
      dateModified
    }, state);
  });

  readonly upsertTasks = this.updater((state, tasks: TaskInterface[]) => {
    return taskAdapter.upsertMany(tasks, state);
  });



  selectTaskState$: Observable<TasksStateInterface> = this.select(state => state);
  selectTaskList$: Observable<TaskInterface[]> = this.select(state => selectAll(state))
  selectTaskMap$: Observable<Dictionary<TaskInterface>> = this.select(state => selectEntities(state))
}
