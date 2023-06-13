import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  private API_URL: string = 'https://restcountries.com/v3.1/name/';
  public helloWorld: string;
  public monTitre: string;
  public monIntroduction: string;
  public maPhraseAcccroche: string;

  public capitale: string = '';
  public population: string = '';
  public monnaie: string = '';
  public langue: string = '';
  public flagURL: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6elfUn7Dr6bJKm3ySfErc8pIjq_6ze7rCYQ&usqp=CAU';

  champSaisi = new FormControl('');

  constructor(private http: HttpClient) {
    this.helloWorld = 'Hello world !';
    this.monTitre = 'MyCapitale';
    this.monIntroduction = 'Obtenez les informations sur un pays !';
    this.maPhraseAcccroche = 'Insérez le pays dans le formulaire ci-dessous.';
  }

  public afficherChampSaisi() {
    this.http.get<any>(this.API_URL + this.champSaisi.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data) {
          const countryData = data[0];
          this.capitale = countryData.capital[0];
          this.population = countryData.population.toString() + ' habitants';
          const currencies = countryData.currencies;
          const currencyKeys = Object.keys(currencies);
          console.log(currencyKeys)
          if (currencyKeys.length > 0) {
            const currencyCode = currencyKeys[0];
            this.monnaie = currencies[currencyCode].name;
          }
          const languages = countryData.languages;
          const languageKeys = Object.keys(languages);
          if (languageKeys.length > 0) {
            const languageCode = languageKeys[0];
            this.langue = languages[languageCode];
          }

          this.flagURL = countryData.flags.png;
          
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error spotted:', error.message);
      },
    });
  }
}
