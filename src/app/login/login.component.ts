import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.Auth.getUserDetails( username, password).subscribe( data => {
      if (data.success) {
        this.router.navigate(['collection']);
        this.Auth.setLoggedIn(true);
      } else {
        console.log(username, password);
        this.router.navigate(['login']);
        window.alert(data.message);
      }
    });
  }

}
