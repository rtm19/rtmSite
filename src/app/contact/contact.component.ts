import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
@ViewChild('f') contactForm: NgForm;
contact_:Contact;
custom_Id : string;

  constructor(private fireDB: AngularFireDatabase) { }

  dbRef = this.fireDB.database.ref("UserEnquiry");

  ngOnInit(): void {

    this.contact_ = { 
      fname:"",
      lname:"",
      email:"",
      phone:"",
      referal:"",
      message:"",
      status:"A"      
    };

  }

  onSubmit(form : NgForm){
    console.log(form);
    this.custom_Id = Date.now().toString();
    this.dbRef.child(this.custom_Id).set(this.contact_);
    // this.dbRef.child(this.custom_Id).child('fname').set(this.contact_.fname);
    // this.dbRef.child(this.custom_Id).child('lname').set(this.contact_.lname);
    // this.dbRef.child(this.custom_Id).child('email').set(this.contact_.email);
    // this.dbRef.child(this.custom_Id).child('phone').set(this.contact_.phone);
    // this.dbRef.child(this.custom_Id).child('referal').set(this.contact_.referal);
    // this.dbRef.child(this.custom_Id).child('message').set(this.contact_.message);
    console.log(this.contact_.fname);
    
  }

}

class Contact {
  fname:string;
  lname:string;
  email:string;
  phone?:string;
  referal:string;
  message:string;
  status:string;
} 