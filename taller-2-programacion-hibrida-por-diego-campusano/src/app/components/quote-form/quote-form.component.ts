import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonItem, IonInput, IonButton, IonCard, IonCardTitle, IonCardHeader, IonText } from "@ionic/angular/standalone";
import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
  standalone: true,
  imports: [IonText, IonCardHeader, IonCardTitle, IonCard, IonItem, IonInput, IonButton, FormsModule]
})
export class QuoteFormComponent  implements OnInit {

  quote: string = "" //Saves a quote.
  author: string = "" //Saves an author.
  newQuote!:Quote //New Quote object.
  @Output() onCreate = new EventEmitter<Quote>() //Outputs an event with type Quote.

  constructor() { }

  ngOnInit() {}

  onClick(){ //On click will call createQuote() and then emits an event with newQuote.
    this.createQuote()
    this.onCreate.emit(this.newQuote)
  }

  createQuote() { //Gives newQuote the values of variables quote and author.
    this.newQuote = {quote: this.quote, author: this.author}
  }
}
