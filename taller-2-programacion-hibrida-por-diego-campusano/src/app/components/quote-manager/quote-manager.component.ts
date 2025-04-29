import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonList, IonButton, IonIcon, IonCard, IonItem, IonCardTitle, IonCardHeader, IonCardSubtitle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons'
import { CommonModule } from '@angular/common';
import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-quote-manager-component',
  templateUrl: './quote-manager.component.html',
  styleUrls: ['./quote-manager.component.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonCardTitle, IonItem, IonCard, IonIcon, IonButton, IonList, CommonModule]
})
export class QuoteManagerComponent  implements OnInit {

  @Input() quotes:Quote[] = [] //Inputs a value into quotes, which is a Quote Array.
  @Output() onDelete = new EventEmitter<{id: number}>() //Outputs an event with an id with type number.

  constructor() { 
    addIcons({trashOutline}) //Deploys icons from ionicons.
  }

  ngOnInit() {}

  deleteQuote(id: number) { //Emits an event with parameter id as a value.
    this.onDelete.emit({id})
    console.log(`Boton Delete ${id}`)
    }
}
