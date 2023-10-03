import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TaskTrackerContainerModule} from "./modules/task-tracker/task-tracker.container";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    TaskTrackerContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
