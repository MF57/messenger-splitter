import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ChoosePeopleComponent} from './choose-people/choose-people.component';


const routes: Routes = [
  {path: 'debts', component: MainComponent},
  {path: '**', component: ChoosePeopleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
