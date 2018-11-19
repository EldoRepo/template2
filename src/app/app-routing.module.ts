import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NewDeckComponent } from './newdeck/newdeck.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { CollectionComponent } from './collection/collection.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'newdeck', component: NewDeckComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'collection', component: CollectionComponent},
  { path: 'play', component: PlayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
