import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css'],
})
export class SectionGenericComponent implements OnInit {
  @Input() title: string = '';
  // creamos una variable de input 'mode' que solo pueda ser 'big' o 'small' y por defecto sea 'big'
  @Input() mode: 'small' | 'big' = 'big';
  @Input() dataTracks: Array<any> = [];

  constructor() {}

  ngOnInit(): void {}
}
