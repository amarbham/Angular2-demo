import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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


  myValueChange(event: any) {
    this.selectedUser = event.id
  }

  constructor(private dataService: DataService) { }

  getUsers() {
    this.dataService.get(this.usersUrl)
      .then(data => {
        this.users = data
        this.selectedUser = data[0]
      })
      .catch(error => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`)
  }

  addUser() {
    const data: User = { id: this.generateUserId(), name: 'user', email: 'user@internet.com', telephone_number: '07955369541' }

    this.dataService.post(this.usersUrl, data)
      .then(user => this.getUsers())
      .catch(error => this.errorMessage = `${error}: Could not add the user. Please try again.`)
  }

  deleteUser(id: number) {
    if (this.users.length == 0) return;

    this.dataService.delete(this.usersUrl + id)
      .then(() => this.users = this.users.filter((user: any) => user.id !== id))
      .catch(error => this.errorMessage = `${error}: Could not delete user. Please try again.`)
  }

  deleteLast() {
    if (this.users.length == 0) return;

    let last = this.users[this.users.length - 1].id;

    this.dataService.delete(this.usersUrl + last)
      .then(() => this.users = this.users.filter((user: any) => user.id !== last))
      .catch(error => this.errorMessage = `${error}: Could not delete user. Please try again.`)
  }


  updateUser(id: number) {
    const updatedUser: User = {
      id: 3,
      name: "updated name",
      email: "updated email",
      telephone_number: "07955635844"
    }

    this.dataService.update(this.usersUrl + id, updatedUser)
      .then((user) => this.getUsers())
  }

  private generateUserId(): number {
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