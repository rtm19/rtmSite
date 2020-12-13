import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';

const appRoutes : Routes = [
    {path: '' , redirectTo: '/home' , pathMatch:'full'},
    {path: 'home', component: HomeCarouselComponent } ,
    {path: 'gallery' , loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) } ,
    {path: 'services' , loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) } ,
    {path: 'pricing' , loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule) } ,
    {path: 'about' , loadChildren: () => import('./about/about.module').then(m => m.AboutModule) } ,
    {path: 'faq' , loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) } ,
    {path: 'contact' , loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) } ,
    {path: 'auth' , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) } ,
    {path: 'upload' , loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) } ,
    {path: 'enquiry' , loadChildren: () => import('./user-enquiry/userEnquiry.module').then(m => m.UserEnquiryModule) }
  ]
  
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes , {preloadingStrategy: PreloadAllModules , anchorScrolling: 'enabled'} )
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }