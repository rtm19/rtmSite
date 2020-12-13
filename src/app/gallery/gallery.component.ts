import { Component, OnInit , ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
//import { NgxImageGalleryComponent, GALLERY_CONF, GALLERY_IMAGE } from "ngx-image-gallery";
import { Lightbox } from 'ngx-lightbox';
import { HostListener } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  //public imageList : Array<string> = []; 
  public thumbnailList : Array<string> = [];   
  public albumNameRcvd : string;
  thumbnailName : string;
  // Declare height and width variables
  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      console.log(this.scrHeight, this.scrWidth);
  }
 
  _albums = [];
  _thumbnail = [];

  constructor(private afStorage : AngularFireStorage , 
              private afAuth : AngularFireAuth , 
              private _lightbox: Lightbox , 
              private route: ActivatedRoute) {
    this.getScreenSize();
  }

   
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.albumNameRcvd = params["albumName"];
        this.thumbnailName = this.albumNameRcvd + "_thumbnail" ; 
        this.getAllImages();
      }
    )    
  }

  getAllImages(){
    this.getThumbnailList();
    this.getImageList();
  }

  async getThumbnailList(){
        //Fetch list of Thumbnails
        var storageRef = firebase.storage().ref(this.thumbnailName); 
        // Now we get the references of these images
        var result = <firebase.storage.ListResult>await storageRef.listAll();
        for(const imageRef of result.items.values()){
          // And finally display them  
          var url = <string>(await (<firebase.storage.Reference>imageRef).getDownloadURL());       
          this.thumbnailList.push(url);
          const urlValue : string = url.toString();
          const thumbnail = {
            src: urlValue,
            thumbName: "a"   
          };    
          this._thumbnail.push(thumbnail);
        }
          //sorting the _thumbnail list after each item is pushed into the list
            // this._thumbnail = this._thumbnail.sort( function(a,b) : number { 
            // const obj1 : number = a.thumbName;
            // const obj2 : number = b.thumbName;           
            // return obj1 - obj2;
            // });
  }

  async getImageList(){
    //Fetch list of Images
    var storageRefImage = firebase.storage().ref(this.albumNameRcvd); 
    // Now we get the references of these images
    var result = <firebase.storage.ListResult>await storageRefImage.listAll();
    for(const imageRef of result.items.values()){
      // And finally display them    
      var url = <string>(await (<firebase.storage.Reference>imageRef).getDownloadURL());
      const urlValue : string = url.toString();
      const album = {
        src: urlValue,
        thumb: "b"    //imageName
      };    
      this._albums.push(album);               
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}

