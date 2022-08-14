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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { LightgalleryModule } from 'lightgallery/angular';
import { DescriptionSectionComponent } from './shared/description-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HomeComponent,
    DescriptionSectionComponent,
  ],
  imports: [
    AppFlexModule,
    NgxFileDropModule,
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDividerModule,
    LightgalleryModule,
    MatTabsModule,
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
