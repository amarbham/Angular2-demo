import { Component, OnInit } from '@angular/core';
import { User } from './users.interface';
import { DataService } from '../common/data.service';

@Component({
  selector: 'users',
  providers: [DataService],
  template: require('./users.template.html')
})

export class UsersComponent implements OnInit {
  users: string;
  errorMessage: any;

  constructor(private dataService: DataService) { }

  addUser(data: User) {
   const addUserUrl: string = 'http://jsonplaceholder.typicode.com/posts/';

    this.dataService.post(addUserUrl, data )
      .subscribe(
      data => { return console.log(data) },
      error => this.errorMessage = `${error}: Could not add the user. Please try again.`
      )
  }

  ngOnInit() {
    const usersUrl: string = 'https://jsonplaceholder.typicode.com/users/';
    this.dataService.get(usersUrl)
      .subscribe(
      data => this.users = data,
      error => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`
      )

    this.addUser({  name: 'jamesh' })

  }
}