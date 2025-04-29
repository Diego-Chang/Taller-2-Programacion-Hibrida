import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonToggle, IonButtons, IonBackButton, IonItem, IonCard } from '@ionic/angular/standalone';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  standalone: true,
  imports: [IonCard, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonToggle, RouterLink]
})
export class ConfigurationPage implements OnInit {

  toggleCheck: boolean = false //Saves value of toggle.

  constructor(
    private configurationService:ConfigurationService //Receives configuration service.
  ) { }

  async ngOnInit() { //On Initiate gets state of toggle to toggleCheck.
    this.toggleCheck = await this.configurationService.getDeleteFromHomePage()
  }

  async toggleChange() { //Executes setDeleteFromHomePage() from ConfigurationService, giving it toggleCheck as a parameter.
    await this.configurationService.setDeleteFromHomePage(this.toggleCheck)
  }

}
