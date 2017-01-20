import { Component, OnInit } from '@angular/core';
import { User } from './users.interface';
import { DataService } from '../common/data.service';

@Component({
  selector: 'users',
  providers: [DataService],
  template: require('./users.template.html')
})

export class UsersComponent implements OnInit {
  users: any;
  errorMessage: any;

  constructor(private dataService: DataService) { }

  getUsers() {
    const usersUrl: string = 'http://localhost:3000/users';
    this.dataService.get(usersUrl)
      .subscribe(
      data => this.users = data,
      error => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`
      )
  }

  addUser() {
    const addUserUrl: string = 'http://localhost:3000/users';

    const data: User = { id: this.generateUserId(), name: 'user', email: 'user@internet.com', telephone_number: '07955369541' }

    this.dataService.post(addUserUrl, data)
      .then(user => this.users.push(user))
      .catch(error => this.errorMessage = `${error}: Could not add the user. Please try again.`)
  }

  deleteUser() {
    if (this.users.length == 0) return;

    let last = this.users[this.users.length - 1].id;

    this.dataService.delete(last)
      .then(() => this.users = this.users.filter((user: any) => user.id !== last))
      .catch(error => this.errorMessage = `${error}: Could not delete user. Please try again.`)
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