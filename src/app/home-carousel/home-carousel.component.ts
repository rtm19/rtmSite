import { Component, OnInit } from '@angular/core';
import { albumListService } from '../shared/albumList.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
  _albumList : Array<string> = [];
  homepageAlbumImg : Array<any> = [];
  
  constructor(private alService : albumListService){}

  ngOnInit(){
    console.log('homeCarousal loaded');
    this.homepageAlbumImg = this.alService.getHomePageImages();  
    console.log(this.homepageAlbumImg)  ;
  }

}

