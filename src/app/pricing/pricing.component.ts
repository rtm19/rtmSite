import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit , AfterViewInit {
@ViewChild('mini') miniRef : ElementRef;
@ViewChild('full') fullRef : ElementRef;
@ViewChild('event') eventRef : ElementRef;
@ViewChild('newborn') newbornRef : ElementRef;
@ViewChild('weddingPhoto') weddingPhotoRef : ElementRef;
@ViewChild('video') videoRef : ElementRef;

miniSelected: boolean = false;
fullSelected: boolean = false;
eventSelected: boolean = false;
newbornSelected: boolean = false;
weddingPhotoSelected: boolean = false;
videoSelected: boolean = false;

serviceCategoryRcvd : string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let serviceCategory = params["serviceName"];
        this.serviceCategoryRcvd = serviceCategory;

        if(this.serviceCategoryRcvd === "mini"){
          this.miniSelected = true
         setTimeout(() => {
             this.miniSelected = false
         }, 1000);
        } else if(this.serviceCategoryRcvd === "full"){
          this.fullSelected = true
         setTimeout(() => {
             this.fullSelected = false
         }, 1000);
        } else if(this.serviceCategoryRcvd === "event"){
          this.eventSelected = true
         setTimeout(() => {
             this.eventSelected = false
         }, 1000);
        } else if(this.serviceCategoryRcvd === "newborn"){
          this.newbornSelected = true
         setTimeout(() => {
             this.newbornSelected = false
         }, 1000);
        } else if(this.serviceCategoryRcvd === "weddingPhoto"){
          this.weddingPhotoSelected = true
         setTimeout(() => {
             this.weddingPhotoSelected = false
         }, 1000);
        } else if(this.serviceCategoryRcvd === "video"){
          this.videoSelected = true
         setTimeout(() => {
             this.videoSelected = false
         }, 1000);
        }
      }
    )
  }

ngAfterViewInit(){
  if(this.serviceCategoryRcvd === "mini"){
    this.miniRef.nativeElement.querySelector('div').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  } else if(this.serviceCategoryRcvd === "full"){
    this.fullRef.nativeElement.querySelector('div').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  } else if(this.serviceCategoryRcvd === "event"){
    this.eventRef.nativeElement.querySelector('div').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  } else if(this.serviceCategoryRcvd === "newborn"){
    this.newbornRef.nativeElement.querySelector('div').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  } else if(this.serviceCategoryRcvd === "weddingPhoto"){
    this.weddingPhotoRef.nativeElement.querySelector('div').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  } else if(this.serviceCategoryRcvd === "video"){
    this.videoRef.nativeElement.querySelector('div').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  
}


}
