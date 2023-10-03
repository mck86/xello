export interface Activity<P = {}> {
  id: string;
  props?: P;
}

export interface ShowAddTaskPanelProp { show: boolean }
export interface TaskEditMode {
    [key:number]: number
}
