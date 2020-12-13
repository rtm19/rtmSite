import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  miniClicked(){
    this.router.navigate(['/pricing' , "mini"]);
  }

  fullClicked(){
    this.router.navigate(['/pricing' , "full"]);
  }

  eventClicked(){
    this.router.navigate(['/pricing' , "event"]);
  }

  newbornClicked(){
    this.router.navigate(['/pricing' , "newborn"]);
  }

  weddingPhotoClicked(){
    this.router.navigate(['/pricing' , "weddingPhoto"]);
  }

  videoClicked(){
    this.router.navigate(['/pricing' , "video"]);
  }

}
