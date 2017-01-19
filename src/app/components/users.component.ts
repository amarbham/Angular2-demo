import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/data.service';

@Component({
  selector: 'users',
  providers: [DataService],
  template: require('./users.template.html')
})

export class UsersComponent implements OnInit {
  users: string;
  errorMessage: any;
  usersUrl: string = 'https://jsonplaceholder.typicode.com/users/';
  addUserUrl: string = 'http://jsonplaceholder.typicode.com/posts/';

  newUser: { id: number, name: string }[] = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get(this.usersUrl)
      .subscribe(
      data => this.users = data,
      error => this.errorMessage = `${error}: Could not get users. Try refreshing the page.`
      )

    this.dataService.post(this.addUserUrl, { id: 1, name: 'jamesh' })
      .subscribe(
      data => { return console.log(data) },
      error => this.errorMessage = `${error}: Could not add the user. Please try again.`
      )
  }
}