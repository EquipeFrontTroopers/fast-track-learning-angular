import {Component, OnInit} from '@angular/core';
import {faUser, faBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {

  actions: any[] = [
    {
      title: 'LISTA DE USUÁRIOS',
      icon: faUser,
      route: './../list-users',
    },
    {
      title: 'LISTA DE CONTEÚDOS',
      icon: faBook,
      route: '',
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
