import {Component, OnInit} from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  constructor(private http: HttpClient) {
  }


  departments: any = [];

  modalTitle = "";
  DepartmentId = 0;
  DepartmentName = "";

  DepartmentIdFilter = "";
  DepartmentNameFilter = "";
  departmentsWithoutFilter: any = [];


  ngOnInit(): void {
    this.refreshList()
  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'department')
      .subscribe(data => {
        this.departments = data;
        this.departmentsWithoutFilter = data;
      });
  }

  addClick() {
    this.modalTitle = "Add Department";
    this.DepartmentId = 0;
    this.DepartmentName = "";
  }

  editClick(dep: any) {
    this.modalTitle = "Edit Department";
    this.DepartmentId = dep.DepartmentId;
    this.DepartmentName = dep.DepartmentName;
  }

  createClick(){
    let val = {
      DepartmentName:this.DepartmentName
    };
    this.http.post(environment.API_URL + 'department', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      })
  }

  updateClick(){
    let val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
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

  FilterFn(){
    let DepartmentIdFilter=this.DepartmentIdFilter;
    let DepartmentNameFilter=this.DepartmentNameFilter;


    this.departments = this.departmentsWithoutFilter.filter(
      function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(
            DepartmentIdFilter.toString().trim().toLowerCase()
          ) &&
          el.DepartmentName.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase())
      }
    );
  }

  sortResult(prop: string, asc: boolean) {
    this.departments = this.departmentsWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }


}
