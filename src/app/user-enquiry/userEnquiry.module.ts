import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { UserEnquiryComponent } from './user-enquiry.component';
import { AgGridModule } from 'ag-grid-angular';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        UserEnquiryComponent
    ],
    imports: [
        FormsModule,          
        RouterModule.forChild([{path:'', component: UserEnquiryComponent}]) ,    // , canActivate: [AuthGuard]
        SharedModule  
        ,AgGridModule.withComponents([])
    ]
    //providers: [LoggingService]
})
export class UserEnquiryModule { }