import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { User } from './users.interface';
import { DataService } from '../../common/data.service';
import { CounterComponent } from '../counter/counter.component';

var faker = require('faker');

@Component({
  selector: 'app-users',
  providers: [DataService],
  template: require('./users.template.html')
})

export class UsersComponent implements OnInit {
  users: any;
  errorMessage: any;
  usersUrl: string = 'http://localhost:3000/users/';
  selectedUser: User;
  form: FormGroup;

  @ViewChild(CounterComponent)
  private counterComponent: CounterComponent;

  @Output() addedUser = new EventEmitter();

  constructor(private dataService: DataService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telephone_number: new FormControl('', [Validators.required]),
    });
  }

  // To do: It should trigger previous or next depending on whether a record has been added or deleted.

  getUsers(user?: any) {
    this.dataService.get(this.usersUrl)
      .toPromise()
      .then(data => this.users = data)
      .then(() => {
        if (this.users.length == 1) {
          this.selectedUser = this.users[0];
        }
      })
      .catch((error => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`));
  }

  deleteUser(user: User) {
    if (this.users.length == 0) return
    const id = user.id;

    this.dataService.delete(this.usersUrl + id)
      .toPromise()
      .then(() => this.getUsers())
      .then(() => {

        for (let x in this.selectedUser) {
          if (this.selectedUser.hasOwnProperty(x)) 
            this.selectedUser[x] = null
        }

        this.form.reset()

        if (this.users.length > 1) {
          this.counterComponent.previous()
        }
      })
      .catch(error => this.errorMessage = `${error}: Could not delete user. Please try again.`);
  }

  updateUser(form: FormGroup) {

    const updatedUser =
      Object.assign({ id: this.selectedUser.id }, form.value)

    this.dataService.update(this.usersUrl + updatedUser.id, updatedUser)
      .toPromise()
      .then(() => this.getUsers())
      .then(() => this.selectedUser = updatedUser)
      .then(() => this.form.reset());
  }

  displayUserRecord(event?: any): void {
    this.selectedUser = this.users[event.value];
  }

  generateUserId(): number {
    let id: number = 1

    if (this.users.length !== 0) {
      id = this.users[this.users.length - 1].id + 1;
    }
    return id
  }

  onSubmit(form: any): void {
    const data: User =
      Object.assign({ id: this.generateUserId() }, form.value)

    this.dataService.post(this.usersUrl, data)
      .toPromise()
      .then(user => {
        this.getUsers()
        this.selectedUser = user
        this.counterComponent.counterData.push(this.selectedUser);
        this.counterComponent.next();
        this.form.reset();
      })
      .catch(error => this.errorMessage = `${error}: Could not add the user. Please try again.`);
  }

  ngOnInit() {
    this.getUsers();
  }
}