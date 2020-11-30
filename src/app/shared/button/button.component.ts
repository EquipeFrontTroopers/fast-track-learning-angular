import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() title: string;
  @Input() btnBlock: boolean;
  @Input() disabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
