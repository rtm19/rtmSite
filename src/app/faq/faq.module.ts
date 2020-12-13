import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './faq.component';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        FaqComponent
    ],
    imports: [
        FormsModule,        
        RouterModule.forChild([{path:'', component: FaqComponent}]) ,
        SharedModule  
    ]
    //providers: [LoggingService]
})
export class FaqModule { }