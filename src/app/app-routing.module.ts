import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { InfoComponent } from './components/info/info.component';



const routes: Routes = [
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'info/:id', component: InfoComponent
  },
  {
    path: '', component: ListComponent
  },
  {
    path: '**', redirectTo: 'list', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
