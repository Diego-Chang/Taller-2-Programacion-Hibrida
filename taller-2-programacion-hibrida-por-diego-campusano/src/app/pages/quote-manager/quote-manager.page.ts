import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { QuotesManagerLayoutComponent } from "../../components/quotes-manager-layout/quotes-manager-layout.component";

@Component({
  selector: 'app-quote-manager',
  templateUrl: './quote-manager.page.html',
  styleUrls: ['./quote-manager.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, QuotesManagerLayoutComponent]
})
export class QuoteManagerPage implements OnInit {

  constructor(
  ) { }

  async ngOnInit() {
  }
}
