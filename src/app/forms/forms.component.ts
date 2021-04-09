import { Component, OnInit } from '@angular/core';
import { faUserTie,faUserPlus,faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  faUserTie = faUserTie;
  faUserPlus = faUserPlus;
  faLock = faLock;

  constructor() { }

  ngOnInit(): void {
  }

}
