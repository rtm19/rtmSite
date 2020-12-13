import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AgGridModule } from 'ag-grid-angular';
import { albumListService } from '../shared/albumList.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-user-enquiry',
  templateUrl: './user-enquiry.component.html',
  styleUrls: ['./user-enquiry.component.css']
})
export class UserEnquiryComponent implements OnInit {
  public enquiryList: Array<any> = []; 
  public finalList: Array<any> = [];

  columnDefs = [
    {headerName: 'Timestamp Id', field: 'id' },
    {headerName: 'First Name', field: 'firstName' },
    {headerName: 'Last Name', field: 'lastName'},
    {headerName: 'Message', field: 'message' },
    {headerName: 'Email', field: 'email' },
    {headerName: 'Phone', field: 'phone' },
    {headerName: 'Referal', field: 'referal' },
    {headerName: 'Status', field: 'status' , editable: true }    
  ];

  rowData :any = [
      // { id: '1', firstName: 'a', lastName: 'aa', message: 'dd' , email: 'gh', phone: '', referal: 'fb'}
  ];

  constructor(private fireDB : AngularFireDatabase, private afAuth : AngularFireAuth , private grid : AgGridModule , private alService : albumListService) { }

  ngOnInit(): void {
    this.rowData = from(this.getUserData());
  }

  async getUserData() : Promise<Array<any>> {
    return new Promise(async (resolve, reject) => {
      this.enquiryList = await this.alService.getUserEnquiryData();
      console.log("inside async getUserData full enquirylist should now be available");
      //console.log(this.enquiryList);
      this.enquiryList.forEach(element => {
        console.log("inside for loop each element values now");
        console.log(element.idKey);
        console.log(element.details.status);
        this.finalList.push({id: element.idKey, 
          firstName : element.details.fname,
          lastName : element.details.lname,
          message : element.details.message,
          email : element.details.email,
          phone : element.details.phone,
          referal : element.details.referal,
          status : element.details.status });
      })  
      resolve(this.finalList);
    });
  }

  // gridClicked(){
  //   console.log("grid got clicked");
  // }

  onCellValueChanged(event){
    console.log("cell value changed");
    // const colId = event.column.getId();
    // console.log(colId);
     const rowInd = event.rowIndex;
    // console.log(rowInd);
    const selectedObj = this.finalList[rowInd];
    const selectedId = selectedObj.id;
    const newValue = event.value;
    console.log(newValue);
    console.log(selectedId);
    if(newValue==='d' || newValue==='D'){
      console.log("delete this entry");
      this.deleteObject(selectedId);
      this.finalList.splice(rowInd,1);
      
    }
    
  }
 
  deleteObject(itemKey) {
    this.fireDB.object('/UserEnquiry/' + itemKey).remove();    
   }

}

