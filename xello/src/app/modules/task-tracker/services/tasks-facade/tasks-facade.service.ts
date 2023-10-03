import {Injectable} from '@angular/core';
import {TasksStore} from "../../state/tasks/tasks.store";
import {map} from "rxjs/operators";
import {TaskInterface} from "../../state/tasks/interfaces/tasks.interface";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TasksFacadeService {

  constructor(private tasksStore: TasksStore) {
  }

  getTaskList(): Observable<TaskInterface[]> {
    return this.tasksStore.selectTaskList$;
  }
}
