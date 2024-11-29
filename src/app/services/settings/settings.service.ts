import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISettings } from 'src/app/models/ISettings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() {}

  loadUserSettings(): Observable<ISettings> {
    return new Observable<ISettings>((subscriber) => {
      const settingsData: ISettings = {
        saveToken: true,
      };
      subscriber.next(settingsData);
    });
  }

  // subject
  loadUserSettingsSubject(data: ISettings): any {
    this.settingsSubject.next(data);
  }

  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingsSubject.asObservable();
  }
}
