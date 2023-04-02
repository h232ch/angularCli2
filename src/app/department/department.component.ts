import { Component, OnInit} from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private commonService: CommonService) {
  }


  departments: any = [];

  modalTitle = "";
  departmentId = 0;
  departmentName = "";

  departmentIdFilter = "";
  departmentNameFilter = "";
  departmentsWithoutFilter: any = [];


  ngOnInit(): void {
    this.refreshList()

  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'department')
      .subscribe(data => {
        this.departments = data;
        this.departmentsWithoutFilter = data;
        // console.log(data)
      });
  }

  addClick() {
    this.modalTitle = "Add Department";
    this.departmentId = 0;
    this.departmentName = "";
  }

  editClick(dep: any) {
    this.modalTitle = "Edit Department";
    this.departmentId = dep.department_id;
    this.departmentName = dep.department_name;
  }

  createClick(){
    let val = {
      department_name:this.departmentName
    };

    // console.log(val)
    this.http.post(environment.API_URL + 'department', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
  }

  updateClick(){
    let val = {
      department_id:this.departmentId,
      department_name:this.departmentName
    };
    this.http.put(environment.API_URL + 'department', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
  }

  deleteClick(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(environment.API_URL + 'department/' + id)
        .subscribe(res => {
          alert(res.toString());
          this.refreshList();
        })
    }
  }

  filterFn() {
    this.departments = this.commonService.filterFn(this.departmentIdFilter, this.departmentNameFilter,
      this.departments, this.departmentsWithoutFilter, "department")
  }

  sortResult(prop: string, asc: boolean) {
    this.commonService.sortResult(this.departments, this.departmentsWithoutFilter, prop, asc)
  }


}
