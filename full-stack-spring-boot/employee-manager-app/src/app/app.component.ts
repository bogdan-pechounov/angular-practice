import { Component, OnInit } from '@angular/core';
import { Employee } from './types/employee';
import { EmployeeService } from './services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'employee-manager-app';

  employees: Employee[] = [];
  editEmployee!: Employee;
  deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees) => (this.employees = employees),
      (error) => alert(error.message)
    );
  }

  onOpenModal(employee: Employee | null, mode: string) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    switch (mode) {
      case 'add':
        button.setAttribute('data-target', '#addEmployeeModal');
        break;
      case 'edit':
        this.editEmployee = employee!;
        button.setAttribute('data-target', '#updateEmployeeModal');
        break;
      case 'delete':
        this.deleteEmployee = employee!;
        button.setAttribute('data-target', '#deleteEmployeeModal');
        break;
    }

    container?.appendChild(button);
    button.click();
  }

  onAddEmployee(addForm: NgForm) {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (employee) => {
        this.getEmployees();
        addForm.reset();
      },
      (error) => alert(error.message)
    );
  }

  onUpdateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(
      (employee) => {
        this.getEmployees();
      },
      (error) => alert(error.message)
    );
  }

  onDeleteEmployee(employee: Employee) {
    this.employeeService
      .deleteEmployee(employee)
      .subscribe(() => this.getEmployees());
  }

  searchEmployees(key: string) {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (!key) {
      this.getEmployees();
    }
  }
}
