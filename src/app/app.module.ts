import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Effect } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HomeResolver } from './components/home/home.resolver';
import { TaskService } from './services/task.service';
import { AppComponent } from './app.component';
import { appRoutes } from './router-config';
import { reducer } from './reducer';
import { TodoEffects } from './effects';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskComponent } from './components/task/task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { SubTaskComponent } from './components/sub-task/sub-task.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTaskComponent,
    TaskComponent,
    EditTaskComponent,
    SubTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    StoreModule.forRoot({
      tasks: reducer
    }),
    EffectsModule.forRoot(
      [TodoEffects]
    )
  ],
  providers: [TaskService, HomeResolver],
  bootstrap: [AppComponent]
})

export class AppModule { }
