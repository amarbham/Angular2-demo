import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { User } from './users.interface';
import { DataService } from '../../common/data.service';

@Component({
  selector: 'users',
  providers: [DataService],
  template: require('./users.template.html')
})

export class UsersComponent implements OnInit {
  users: any;
  errorMessage: any;
  usersUrl: string = 'http://localhost:3000/users/';
  selectedUser: User;
  form: FormGroup;

  @Output() addedUser = new EventEmitter();

  constructor(private dataService: DataService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telephone_number: new FormControl('', [Validators.required]),
    });

    // this.form.valueChanges
    //   .subscribe(formValue => console.log(formValue))
  }

  
  getUsers(user?: any) {
    this.dataService.get(this.usersUrl)
      .subscribe(
        (data) => {
        this.users = data;
        this.selectedUser = user || data[0];
        return this.updateFormValues(data);
      },
        (error: any) => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`) 
  }

  addUser() {
    const data: User = { id: this.generateUserId(), name: 'user', email: 'user@internet.com', telephone_number: '07955369541' }

    this.dataService.post(this.usersUrl, data)
      .then(user => this.getUsers(user))
      .catch(error => this.errorMessage = `${error}: Could not add the user. Please try again.`)

  }

  deleteUser(user: User) {
    if (this.users.length == 0) return;

    this.dataService.delete(this.usersUrl + user.id)
      .then(() => this.getUsers())  //return this.users = this.users.filter((user: any) => user.id !== id) })
      .catch(error => this.errorMessage = `${error}: Could not delete user. Please try again.`)
  }

  updateUser(user: User) {
    const updatedUser: User = {
      id: 3,
      name: "updated name",
      email: "updated email",
      telephone_number: "07955635844"
    }

    this.dataService.update(this.usersUrl + updatedUser.id, updatedUser)
      .then((user) => this.getUsers(updatedUser))
  }

  updateFormValues(data?: any){
    if(this.users.length == 0) return this.form.reset();

    this.form.reset()
    this.form.patchValue({
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      telephone_number: this.selectedUser.telephone_number
    })
  }

  displayUserRecord(event: any): void {
    this.selectedUser = event.selected;
    this.updateFormValues();
  }

  generateUserId(): number {
    let id: number = 1

    if (this.users.length !== 0) {
      id = this.users[this.users.length - 1].id + 1;
    }
    return id;
  }

  ngOnInit() {
    this.getUsers()
  }
}