import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

@Injectable({providedIn : 'root'})
export class albumListService{
    public albumList : Array<string> = []; 
    public homePageImgs = [];
    private chkList : Array<string> = []; 
    public finalHomeImgList = [];
    private userData = [];
    public enquiryList = [];

    constructor(private fireDB : AngularFireDatabase, private afAuth : AngularFireAuth, private afStorage : AngularFireStorage) { }

    getAlbumList(): Array<string> {
        if(this.albumList === undefined || this.albumList.length == 0){
            this.populateAlbumList();
            
        }
        return this.albumList;
    }

    populateAlbumList(){
         this.fireDB.list('Albums').snapshotChanges().subscribe( res => {
            res.forEach(doc => {
            this.albumList.push(doc.payload.val().toString());
            });            
          }); 
    }


    getHomePageImages() : Array<any> {
        if(this.finalHomeImgList === undefined || this.finalHomeImgList.length == 0){
            this.populateHomePageImgs();
        }
        return this.finalHomeImgList;
    }

    async populateHomePageImgs(){
        var storageRefImage = firebase.storage().ref("HomeImages"); 
        var result = <firebase.storage.ListResult>await storageRefImage.listAll();
        for(const imageRef of result.items.values()){
            var url = <string>(await (<firebase.storage.Reference>imageRef).getDownloadURL());
            const urlValue : string = url.toString();  
            const fullAlbumName : string =  imageRef.fullPath ;
            const album_name : string = fullAlbumName.substr( fullAlbumName.indexOf("/") + 1 );
            const homeImages = {
                src: urlValue,
                name: album_name  
              };                   
            this.homePageImgs.push(homeImages);    
            //console.log(homeImages.name);           
        }

        //console.log("inside async function");
        //console.log("before calling chkalbumList async function..");
        this.chkList = await this.chkAlbumList();
        //console.log("after async function chkAlbumList executed");
        //console.log(this.chkList);
        this.chkList.forEach(element => {
            //console.log(element);                         
            this.homePageImgs.forEach(_element => {
                if(element === _element.name){
                    // const _src : string = _element.src.toString();
                    // const _albumName : string = _element.name.toString();
                    //console.log(_element.src);
                    const finalListItem = {
                        _src: _element.src.toString(),
                        _albumName: _element.name.toString()  
                      };
                    this.finalHomeImgList.push(finalListItem);
                }
            });
        });
        console.log("print final list");
        console.log(this.finalHomeImgList);
    }

    async chkAlbumList() : Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.fireDB.list('Albums').snapshotChanges().subscribe(
              response => {
                response.forEach(doc => {
                    this.chkList.push(doc.payload.val().toString());
                    }); 
                    resolve(this.chkList);
              },error => {
             }
           );       
         })
    }


    async getUserEnquiryData() : Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.fireDB.list('UserEnquiry').snapshotChanges().subscribe(
              res => {
                res.forEach(doc => {
                    const _enquiry = {
                        idKey : doc.payload.ref.key,
                        details : doc.payload.val()
                      }
                      this.userData.push(_enquiry);
                    }); 
                    resolve(this.userData);
              },error => {}
           );       
         })        
    }
}

class Album{
    albumName : string ;
    id : number;
  }