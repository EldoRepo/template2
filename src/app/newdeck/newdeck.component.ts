import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-newdeck',
  templateUrl: './newdeck.component.html',
  styleUrls: ['./newdeck.component.scss']
})
export class NewDeckComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;


  constructor(private formBuilder: FormBuilder,
    private Auth: AuthService,
    private Data: DataService,
    private router: Router,
    private http: HttpClient ) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      Decklist: ['', Validators.required]
    });
  }

  createDeck(event) {
    this.submitted = true;
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const decklist = target.querySelector('#decklist').value;
    this.Data.createNewDeck( name, decklist).subscribe( data => {
      if (data.success) {
        this.router.navigate(['collection']);
      } else {
        this.router.navigate(['newdeck']);
        window.alert(data.message);
      }
      });
  if (this.messageForm.invalid) {
      return;
  }

  this.success = true;
}

ngOnInit() {
}

}


