import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared/shared.module';
//import { NgxImageGalleryModule } from 'ngx-image-gallery';
//import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        GalleryComponent
    ],
    imports: [
        FormsModule,        
        RouterModule.forChild([{path:'', component: GalleryComponent},
                                {path:':albumName', component: GalleryComponent}]) ,
        SharedModule  
       //, NgxImageGalleryModule
    ]
    ,  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryModule { }