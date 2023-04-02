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
  department: any;
  dateOfJoining = "";
  photoFileName = "anonymous.png";
  photoPath = environment.PHOTO_URL;

  employeeIdFilter = "";
  employeeNameFilter = "";
  employeesWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshList()

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
    this.employeeId = emp.employee_id;
    this.employeeName = emp.employee_name;
    this.department = emp.department;
    this.dateOfJoining = emp.date_of_joining;
    this.photoFileName = emp.photo_file_name;
  }

  createClick(){
    const val = {
      employee_name: this.employeeName,
      department: this.department,
      date_of_joining: this.dateOfJoining,
      photo_file_name: this.photoFileName,
      ep_department_name: "test",
    };
    console.log(val)
    this.http.post(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
  }

  updateClick(){
    const val = {
      employee_id: this.employeeId,
      employee_name: this.employeeName,
      department: this.department,
      date_of_joining: this.dateOfJoining,
      photo_file_name: this.photoFileName,
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
