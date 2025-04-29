import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonCard, IonCardContent, IonText, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { settingsOutline, close, add  } from 'ionicons/icons'
import { RouterModule } from '@angular/router'
import { Quote } from '../models/quote';
import { QuoteManagerService } from '../services/quote-manager.service';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonCardTitle, IonText, IonCardContent, IonFabButton, IonFab, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, RouterModule, CommonModule, IonCard]
})
export class HomePage implements OnInit{

  randomQuote: Quote = { //Saves a random quote from the DB.
    quote: "Lorem Ipsum",
    author: "Dolor Est"
  }
  toggleCheckValue: boolean = false //Saves state of toggle from Configuration Page.

  constructor(
    private quoteManagerService:QuoteManagerService, //Receives Service for quote managing.
    private configurationService:ConfigurationService //Receives Service for configuration management.
  ) {
    addIcons({close,add,settingsOutline}); //Deploys icons from ionicons.
  }

  async ngOnInit() {
    await this.quoteManagerService.startPlugin() //On Initiate starts DB plugin.

    this.randomQuote = await this.quoteManagerService.getQuoteListRandom() //On Initiate gets a random quote for RandomQuote from the Quote Managing Service.

    this.toggleCheckValue = await this.configurationService.getDeleteFromHomePage() //On Initiate gets the state of the toggle saved on the Configuration Service.

    console.log(this.randomQuote) //Debugging.
  }

  toggleCheck() { return this.toggleCheckValue } //Returns value of the toggle of Configuration Page for evaluation on html.

  async deleteQuoteHomePage() { //Calls for deletion of the randomQuote on display and swaps it for another.
    await this.quoteManagerService.deleteQuote(this.randomQuote.id ?? 0)
    this.randomQuote = await this.quoteManagerService.getQuoteListRandom()
    }
}
