import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AppFlexModule } from 'src/lib/flex';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { HotelComponent } from './pages/hotel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, HotelComponent, HomeComponent],
  imports: [
    AppFlexModule,
    NgxFileDropModule,
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
