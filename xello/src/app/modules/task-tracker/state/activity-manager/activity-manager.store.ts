import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { Activity } from './interfaces/activity.interface';

export interface ActivityManagerState extends EntityState<Activity<any>> {}

const activityAdapter = createEntityAdapter<Activity<any>>();
const initialState = activityAdapter.getInitialState();
const { selectEntities } = activityAdapter.getSelectors();

@Injectable({ providedIn: 'root' })
export class ActivityManagerStore extends ComponentStore<ActivityManagerState> {
  constructor() {
    super(initialState);
  }

  readonly upsertActivity = this.updater((state, activity: Activity<any>) => {
    return activityAdapter.upsertOne(activity, state);
  });

  readonly removeActivity = this.updater((state, id: string) => {
    return activityAdapter.removeOne(id, state);
  });

  selectActivityById$<P>(id: string): Observable<Activity<P>> {
    return this.select(state => {
      const entities = selectEntities(state);
      return entities[id];
    });
  }

  createActivityPayload<P>(id: string, props: P): Activity<P> {
    return {
      id,
      props
    }
  }
}
