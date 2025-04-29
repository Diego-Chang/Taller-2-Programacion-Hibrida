import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly DELETE_FROM_HOMEPAGE_KEY = "DELETE_FROM_HOMEPAGE" //Saves state from toggle on configuration page.

  constructor() { }

  async getDeleteFromHomePage(): Promise<boolean> { //Gets the value from DELETE_FROM_HOMEPAGE_KEY.
    const deleteFromHomePage = await Preferences.get({key: this.DELETE_FROM_HOMEPAGE_KEY})
    return deleteFromHomePage?.value == "true" ? true : false
  }
  
  async setDeleteFromHomePage(valCheck: boolean):Promise<void> { //Sets the value of DELETE_FROM_HOMEPAGE_KEY.
    await Preferences.set({
      key: this.DELETE_FROM_HOMEPAGE_KEY,
      value: valCheck ? "true" : "false"
    })
  }
}
