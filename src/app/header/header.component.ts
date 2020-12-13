import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import siteMenuCloneCopy from 'src/assets/js/main';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit , AfterViewChecked {
  public albumList : Array<string> = []; 
  private albumPopulated : Boolean = false;

  constructor(private fireDB : AngularFireDatabase, private afAuth : AngularFireAuth) { }

  ngOnInit(): void {
    this.fireDB.list('Albums').snapshotChanges().subscribe(res => {

      res.forEach(doc => {
      //console.log(doc.payload.ref.key);
      this.albumList.push(doc.payload.val().toString());

      });      

    });
  }

  ngAfterViewChecked(): void {
    
    if(this.albumList.length > 0 && !this.albumPopulated){
      this.albumPopulated = true;
      //console.log("new lifecycle hook and albumPopualted value is " + this.albumPopulated);
      this.updateMobileMenu();
    }
    
  }

  updateMobileMenu(){
    //console.log("array populated");
    siteMenuCloneCopy();
  }  

}

class Album{
  albumName : string ;
  id : number;
}
