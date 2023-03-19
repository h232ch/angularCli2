import { Component } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {CommonService} from "../common.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  constructor(
    private http: HttpClient,
    private commonService: CommonService) {

  }

  departments: any=[];
  employees: any=[];
  modalTitle = "";
  employeeId = 0
  employeeName = "";
  department = "";
  dateOfJoining = "";
  photoFileName = "anonymous.png";
  photoPath = environment.PHOTO_URL;

  employeeIdFilter = "";
  employeeNameFilter = "";
  employeesWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshList()
    console.log("OnInit strt")
  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'employee')
      .subscribe(data => {
        this.employees = data;
        this.employeesWithoutFilter = data;
      });

    this.http.get<any>(environment.API_URL + 'department')
      .subscribe(data => {
        this.departments = data;
      });
  }

  addClick() {
    this.modalTitle = "Add Employee";
    this.employeeId = 0;
    this.employeeName = "";
    this.department="";
    this.dateOfJoining="";
    this.photoFileName="anonymous.png";
  }

  editClick(emp: any) {
    this.modalTitle = "Add Employee";
    this.employeeId = emp.EmployeeId;
    this.employeeName = emp.EmployeeName;
    this.department = emp.Department;
    this.dateOfJoining = emp.DateOfJoining;
    this.photoFileName = emp.PhotoFileName;
  }

  createClick(){
    const val = {
      EmployeeName: this.employeeName,
      Department: this.department,
      DateOfJoining: this.dateOfJoining,
      PhotoFileName: this.photoFileName,
    };
    this.http.post(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
  }

  updateClick(){
    const val = {
      EmployeeId: this.employeeId,
      EmployeeName: this.employeeName,
      Department: this.department,
      DateOfJoining: this.dateOfJoining,
      PhotoFileName: this.photoFileName,
    };
    this.http.put(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
      this.http.delete(environment.API_URL + 'employee/' + id)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
    }
  }

  imageUpload(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.http.post(environment.API_URL + 'employee/savefile', formData)
      .subscribe((data: any) => {
        this.photoFileName = data.toString();
      })
  }

  filterFn() {
    this.employees = this.commonService.filterFn(this.employeeIdFilter, this.employeeNameFilter,
      this.employees, this.employeesWithoutFilter, "employee")
  }

  sortResult(prop: string, asc: boolean) {
    this.commonService.sortResult(this.employees, this.employeesWithoutFilter, prop, asc)
  }
}
