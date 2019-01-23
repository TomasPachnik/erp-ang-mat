import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor() {
  }

  static getLanguage() {
    if (localStorage.getItem('language') === null) {
      localStorage.setItem('language', 'sk');
    }
    return localStorage.getItem('language');
  }

  static setLanguage(language: string) {
    localStorage.setItem('language', language);
  }

}
