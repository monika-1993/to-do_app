import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { HomeComponent } from './components/home/home.component';
import { TaskService } from './services/task.service';
import { AppComponent } from './app.component';
import { appRoutes } from './router-config';
import { reducer } from './reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    StoreModule.forRoot({
      tasks: reducer
    })
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
