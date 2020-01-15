import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactdetailsComponent } from './contacts/contactdetails.component';
import { TealiumUtagService } from './utag.service';
import { TealiumDataService } from './tealium-data.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LinkDirective } from './directives';
import {FormBuilderComponent} from './form-builder.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {CustomEventService} from './custom-event.service';
import { SuccessComponent } from './success/success.component';
import { EventListenerService } from './event-listener.service';

const appRoutes: Routes = [
{ path: 'contacts', component: ContactsComponent },
{ path: 'editcontact', component: ContactdetailsComponent },
{ path: 'feedback', component: FormBuilderComponent },
{ path: 'aboutus', component: AboutUsComponent },
{ path: 'success', component: SuccessComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactdetailsComponent,
    LinkDirective,
    FormBuilderComponent,
    AboutUsComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [TealiumUtagService,EventListenerService,TealiumDataService, CustomEventService, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  constructor(private router: Router, private tealium: TealiumUtagService) {
    router.events.subscribe((val) => {
  if(val instanceof NavigationEnd){
           this.tealium.view();
  }
    });
  } 

 }
