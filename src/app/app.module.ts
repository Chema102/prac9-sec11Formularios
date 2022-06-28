import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//para hacer formularios por template 'FormsModule'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//para hacer formularios por rectivos 'ReactiveFormsModule'


import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shareds/navbar/navbar.component';
import { TemplateComponent } from './components/template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
