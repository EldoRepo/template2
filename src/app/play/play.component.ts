import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
    constructor(private Data: DataService,
                private router: Router,
                private http: HttpClient) { }

  ngOnInit() {
  }

  createGame(event) {
    event.preventDefault();
    const target = event.target;
    const deck1 = target.querySelector('#deck1').value;
    const deck2 = target.querySelector('#deck2').value;
    this.Data.createNewGame( deck1, deck2).subscribe( data => {
      if (data.success) {
        this.router.navigate(['collection']);
      } else {
        this.router.navigate(['play']);
        window.alert(data.message);
      }
    });
  }

}
