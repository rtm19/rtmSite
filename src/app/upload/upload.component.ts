import { Component, OnInit } from '@angular/core';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  taskThumbnail: AngularFireUploadTask;
  taskHomeImg: AngularFireUploadTask;
  public albumList : Array<string> = []; 
  selectedLevel;
  localFilePath: any;
  localThumbnail: any;
  localHomeImg: any;
  selectedAlbumName : String;
  public uploadFileStatus : string = "";
  public uploadThumbnailStatus : string = "";
  public uploadHomeImgStatus : string = "";

  constructor(private afStorage : AngularFireStorage ,private fireDB : AngularFireDatabase, private afAuth : AngularFireAuth , private router: Router ) { }

  selected(){
    this.selectedAlbumName = this.selectedLevel;
    console.log("Selected albumName is " + this.selectedLevel);
  }

  ngOnInit(): void {
   this.fireDB.list('Albums').snapshotChanges().subscribe(res => {

      res.forEach(doc => {
      console.log(doc.payload.ref.key);
      this.albumList.push(doc.payload.val().toString());

      });      

    });
  }

  upload(event){
    this.uploadFileStatus = "";
    this.localFilePath = event.target.files[0];
  }

  uploadThumbnail(event){
    this.uploadThumbnailStatus = "";
    this.localThumbnail = event.target.files[0];
  }

  uploadClicked(){
    var id = Date.now();
    console.log("current date time is " + id);
    this.ref = this.afStorage.ref(this.selectedAlbumName + "/" + id);
    this.task = this.ref.put(this.localFilePath );
    this.task.then(function(onFulfilled) {
      this.uploadFileStatus = "Success";
    }.bind(this) , function(onRejected){
      this.uploadFileStatus = "Failed";
    }.bind(this));
    this.ref = this.afStorage.ref(this.selectedAlbumName + "_thumbnail/" + id);
    this.taskThumbnail = this.ref.put(this.localThumbnail );
    this.taskThumbnail.then(function(onFulfilled) {
      this.uploadThumbnailStatus = "Success";
    }.bind(this) , function(onRejected){
      this.uploadThumbnailStatus = "Failed";
    }.bind(this));    
  }

  uploadHomeImages(event){
    this.uploadHomeImgStatus = "";
    this.localHomeImg = event.target.files[0];
  }

  uploadHomeImg(){
    this.ref = this.afStorage.ref("HomeImages/" + this.selectedAlbumName);
    this.taskHomeImg = this.ref.put(this.localHomeImg );
    this.taskHomeImg.then(function(onFulfilled) {
      this.uploadHomeImgStatus = "Success";
    }.bind(this) , function(onRejected){
      this.uploadHomeImgStatus = "Failed";
    }.bind(this));
  }

  userEnquiryClicked(){
    this.router.navigate(['/enquiry']);
  }

}

class Album{
  albumName : string ;
  id : number;
}