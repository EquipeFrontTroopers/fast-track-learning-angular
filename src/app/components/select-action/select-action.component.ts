import {Component, OnInit} from '@angular/core';
import {faUser, faBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {

  faUser = faUser;
  faBook = faBook;

  constructor() {
  }

  ngOnInit(): void {
  }

}
