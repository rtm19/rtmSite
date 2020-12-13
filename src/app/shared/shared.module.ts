import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
//import { DropdownDirective } from '../directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        PlaceholderDirective
        //DropdownDirective
    ],
    imports: [CommonModule],
    exports: [
        LoadingSpinnerComponent,
        PlaceholderDirective,
        //DropdownDirective,
        CommonModule
    ],
    //entryComponents: [AlertComponent],
    //providers: [LoggingService]
})
export class SharedModule{ }