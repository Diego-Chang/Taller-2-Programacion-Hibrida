import { Component, OnInit } from '@angular/core';
import { QuoteFormComponent } from 'src/app/components/quote-form/quote-form.component';
import { QuoteManagerComponent } from 'src/app/components/quote-manager/quote-manager.component';
import { Quote } from 'src/app/models/quote';
import { QuoteManagerService } from 'src/app/services/quote-manager.service';

@Component({
  selector: 'app-quotes-manager-layout',
  templateUrl: './quotes-manager-layout.component.html',
  styleUrls: ['./quotes-manager-layout.component.scss'],
  standalone: true,
  imports: [QuoteFormComponent, QuoteManagerComponent]
})
export class QuotesManagerLayoutComponent  implements OnInit {

  quotesList:Quote[] = [] //Array of Quote objects.

  constructor(
    private quoteManagerService: QuoteManagerService //Receives service for quote managing
  ) { }

  async ngOnInit() { //On Intiate starts DB plugin and calls to method update()
    await this.quoteManagerService.startPlugin()
    await this.update()
  }

  private async update(){ //Gets the list of Quote objects on DB.
    this.quotesList = await this.quoteManagerService.getQuoteList()
  }

  async onCreateQuote($event: Quote) { //Adds a quote to DB based on object Quote received and gets the new list of quotes from DB.
    await this.quoteManagerService.addQuote($event)
    await this.update()
  }

  async onDeleteQuote($event: number) { //Deletes a quote on DB based on object id received and gets the new list of quotes from DB.
    console.log($event)
    await this.quoteManagerService.deleteQuote($event)
    await this.update()
  }
}
