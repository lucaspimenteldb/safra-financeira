import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxMaskModule, IConfig  } from 'ngx-mask';
import { EditClientComponent } from './edit-client/edit-client.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    SignUpComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
