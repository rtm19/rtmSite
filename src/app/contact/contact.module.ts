import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';

//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        ContactComponent
    ],
    imports: [
        FormsModule,        
        RouterModule.forChild([{path:'', component: ContactComponent}]) ,
        SharedModule  
    ]
    //providers: [LoggingService]
})
export class ContactModule { }