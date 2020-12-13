import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PricingComponent } from './pricing.component';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        PricingComponent
    ],
    imports: [
        FormsModule,        
        RouterModule.forChild([{path:'', component: PricingComponent},
                                {path:':serviceName', component: PricingComponent}]) ,
        SharedModule  
    ]
    //providers: [LoggingService]
})
export class PricingModule { }