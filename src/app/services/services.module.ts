import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ServicesComponent } from './services.component';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        ServicesComponent
    ],
    imports: [
        FormsModule,        
        RouterModule.forChild([{path:'', component: ServicesComponent}]) ,
        SharedModule  
    ]
    //providers: [LoggingService]
})
export class ServicesModule { }