import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {}

  registerUser(event) {
    event.preventDefualt();
    const errors = [];
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;
    const email = target.querySelector('#email').value;

    console.log(username, password);
    if (password !== cpassword) {
      errors.push('Passwords do not match');
    }

    if (errors.length === 0) {
      this.Auth.registerUser(email, username, password, cpassword).subscribe(data => {
        console.log(data);
        if (data.success) {
         /// this.router.navigate(['home']);
        }
      });
    }
    console.log(username, password);
  }
}
