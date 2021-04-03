import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GeoMapboxComponent } from './geo-mapbox/geo-mapbox.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    GeoMapboxComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: NavbarComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent}, 
      {path: 'geo-mapbox', component: GeoMapboxComponent}, 
      {path: 'logout', component: LogoutComponent} 
          
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
