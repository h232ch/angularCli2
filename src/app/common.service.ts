import { Injectable } from '@angular/core';
import {DepartmentComponent} from "./department/department.component";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  sortResult(data: [], filter: [], prop: string, asc: boolean) {
    data = filter.sort((a: any, b: any) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  filterFn(idFilter: any, nameFilter: any, data: [],
           filter: any, type: string){
    return data = filter.filter(
      (el: any) => {
        if (type == "department") {
          return el.department_id.toString().toLowerCase().includes(
              idFilter.toString().trim().toLowerCase()
            ) &&
            el.department_name.toString().toLowerCase().includes(
              nameFilter.toString().trim().toLowerCase());
        } else if (type = "employee") {
          return el.employee_id.toString().toLowerCase().includes(
              idFilter.toString().trim().toLowerCase()
            ) &&
            el.employee_name.toString().toLowerCase().includes(
              nameFilter.toString().trim().toLowerCase());
        } else {
          return console.log("Error: There is no type.")
        }
      }
    );
  }
}
