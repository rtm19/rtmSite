import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload.component';
import { AuthGuard } from '../auth/auth.guard';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        FormsModule,        
        // RouterModule.forChild([{path:'', component: UploadComponent}]) ,    
        RouterModule.forChild([{path:'', component: UploadComponent , canActivate: [AuthGuard]}]) ,    //comment
        SharedModule  
    ]
    //providers: [LoggingService]
})
export class UploadModule { }