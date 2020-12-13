import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        FormsModule,        
        RouterModule.forChild([{path:'', component: AboutComponent}]) ,
        SharedModule  
    ]
    //providers: [LoggingService]
})
export class AboutModule { }