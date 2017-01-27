import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { User } from './users.interface';
import { DataService } from '../../common/data.service';

var faker = require('faker');

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

  // move the selected user on onAdd and onDelete

  getUsers(user?: any) {
    this.dataService.get(this.usersUrl)
      .subscribe(
      (data) => this.users = data,
      (error: any) => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`)
  }

  addUser() {
    const data: User = {
      id: this.generateUserId(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      telephone_number: faker.phone.phoneNumber()
    }

    this.dataService.post(this.usersUrl, data)
      .toPromise()
      .then(user => {
        this.users.push(user)
        return user;
      })
      .then(user => {
        //  this.selectedUser = user;
        //  return this.updateFormValues(this.selectedUser)
      })
      .catch(error => this.errorMessage = `${error}: Could not add the user. Please try again.`)

  }

  deleteUser(user: User) {
    if (this.users.length == 0) return;

    const id = user.id;

    this.dataService.delete(this.usersUrl + id)
      .toPromise()
      .then(() => {
        return this.users = this.users.filter((user: any) => user.id !== id
        )
      })
      .then(data => {
        //  this.selectedUser = data[data.length - 1]
        // return this.updateFormValues(this.selectedUser)
      })
      .catch(error => this.errorMessage = `${error}: Could not delete user. Please try again.`)
  }

  updateUser(user: User) {
    const updatedUser: User = {
      id: this.selectedUser.id,
      name: this.form.value.name,
      email: this.form.value.email,
      telephone_number: this.form.value.telephone_number
    }

    this.dataService.update(this.usersUrl + updatedUser.id, updatedUser)
      .toPromise()
      .then(() => {
        return this.users = this.users.map((user: User) => {
          if (user.id == updatedUser.id) {
            user.name = updatedUser.name
            user.email = updatedUser.email
            user.telephone_number = updatedUser.telephone_number
          }
          return user;
        })
      })
    //  .then((user) => {
    //    console.log(user)
    //    return this.updateFormValues(user)
    //   })
  }

  // updateFormValues(user?: User) {
  //   if (this.users.length == 0) return this.form.reset();

  //   this.form.reset()
  //   this.form.setValue({
  //     name: user.name,
  //     email: user.email,
  //     telephone_number: user.telephone_number
  //   })
  // }

  displayUserRecord(event: any): void {
    console.log(event.selected)
    this.selectedUser = event.selected;

    if (this.users.length == 0) return this.form.reset();

    this.form.reset()
    this.form.setValue({
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      telephone_number: this.selectedUser.telephone_number
    })

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