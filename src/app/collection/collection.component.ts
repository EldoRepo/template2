import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  h1Style = false;
  users:  Object;
  constructor(private Data: DataService) { }
  ngOnInit() {
    this.Data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }
}
