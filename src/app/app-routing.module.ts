import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { HotelComponent } from './pages/hotel.component';

const routes: Routes = [
  {
    component: HotelComponent,
    path: 'hotel/:codename',
  },
  {
    component: HomeComponent,
    path: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
