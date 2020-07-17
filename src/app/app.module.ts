import { CompletedService } from './Services/completed.service';
import { DeletedService } from './Services/deleted.service';
import { TokenService } from './Services/token.service';
import { TasksService } from './Services/tasks.service';
import { GlobalVariables } from './global';
import { NotFoundComponent } from './components/404-component/404.component';
import { DeletedComponent } from './components/deleted-component/deleted.component';
import { CompletedComponent } from './components/completed-component/completed.component';
import { TasksComponent } from './components/tasks-component/tasks.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule, AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CompletedComponent,
    DeletedComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    DragulaModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [
    GlobalVariables,
    {
      provide: APP_BASE_HREF,
      useValue: '/' + localStorage.getItem('Token')
    },
    TokenService,
    TasksService,
    DeletedService,
    CompletedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
