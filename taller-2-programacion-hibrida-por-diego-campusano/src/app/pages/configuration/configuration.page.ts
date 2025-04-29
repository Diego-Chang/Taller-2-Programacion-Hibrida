import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonToggle, IonButtons, IonBackButton, IonItem, ToggleChangeEventDetail, IonCard } from '@ionic/angular/standalone';
import { IonToggleCustomEvent } from '@ionic/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  standalone: true,
  imports: [IonCard, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonToggle]
})
export class ConfigurationPage implements OnInit {

  toggleCheck: boolean = false //Saves value of toggle.

  constructor(
    private configurationService:ConfigurationService //Receives configuration service.
  ) { }

  async ngOnInit() { //On Initiate gets state of toggle to toggleCheck.
    this.toggleCheck = await this.configurationService.getDeleteFromHomePage()
  }

  async toggleChange() { //Executes setDeleteFromHomePage with toggleCheck as a parameter.
    await this.configurationService.setDeleteFromHomePage(this.toggleCheck)
    }
}
