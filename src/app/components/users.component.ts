import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/data.service';

@Component({
  selector: 'users',
  providers: [DataService],
  template: require('./users.template.html')
})

export class UsersComponent implements OnInit{
  users: string;
  errorMessage: any;
  usersUrl: string = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.dataService.get(this.usersUrl)
      .subscribe(
        data => this.users = data,
        error => this.errorMessage = error
      )
  }
}