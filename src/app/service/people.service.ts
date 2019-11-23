import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Debt, Debters, Person} from '../model/model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PeopleService {


  private selectedPeople: Person[] = [];

  constructor(private http: HttpClient) {
  }

  public getPeople(): Observable<Person[]> {
    // return of([
    //   new Person("1", "Bochen", "https://scontent.fwaw3-1.fna.fbcdn.net/v/t1.0-9/75262276_2440244499345747_3381666788545658880_o.jpg?_nc_cat=100&_nc_ohc=IsHUGcKDQ9wAQnJMnBuygq_Jii2HEeyxSUzxLUrc959YpTOZc8Ic7pq0w&_nc_ht=scontent.fwaw3-1.fna&oh=5a12bf62554f8fd940f33c858fc657d4&oe=5E437E5F", []),
    //   new Person("2", "Pożar", "https://lh3.googleusercontent.com/a-/AAuE7mByfzvtLtvAFCxmvPt4YIaP535EjmiNB3eZKJGxAQ=s56-c-k-no", []),
    //   // new Person("3", "Szymon", "https://scontent.fwaw3-2.fna.fbcdn.net/v/t1.0-9/13754414_1334954576531945_1678855005110477656_n.jpg?_nc_cat=103&_nc_ohc=iMrMJSq7uT8AQnc-kixTgTNJ4d_GwkLvsM32WlR1Ia6dUb90acoB9PDiQ&_nc_ht=scontent.fwaw3-2.fna&oh=b7302d913b623ae4fd93479f115de2f1&oe=5E42C7FD", []),
    //   // new Person("4", "Paulina", "https://scontent.fwaw3-1.fna.fbcdn.net/v/t1.0-9/75540123_2837195052957748_6888708109162774528_o.jpg?_nc_cat=106&_nc_ohc=L8maZciBzTUAQknsBunVxtxcpWbjujYOzj18uRHoFcebec3EnyxzhGHXA&_nc_ht=scontent.fwaw3-1.fna&oh=cc291d752421eca1c072aed26e0731dc&oe=5E7E9328", []),
    //   // new Person("5", "Sylwia", "https://scontent.fwaw3-2.fna.fbcdn.net/v/t31.0-1/20232074_1051711358299443_8414279363181631467_o.jpg?_nc_cat=104&_nc_ohc=qZfgrwaldc8AQns1O-Fujn9UR_YJdd-3WBweKUkTLH5ESjYWReAeq_1bA&_nc_ht=scontent.fwaw3-2.fna&oh=1a767e300842e9b4d4851055f633b78f&oe=5E48C08C", []),
    //   // new Person("6", "Klaudia", "https://scontent.fwaw3-2.fna.fbcdn.net/v/t1.0-9/73183694_3168082819900629_3273728307572506624_n.jpg?_nc_cat=101&_nc_ohc=zcxN6bEnI2wAQltDvhdjwNw4gzT4J7ffUEBqTYXPG8de46V6fyEF56w7A&_nc_ht=scontent.fwaw3-2.fna&oh=a48486b255f0d4199851d9081bcb1671&oe=5E44C389", []),
    // ]);
    return of(this.selectedPeople);
  }

  public setPeople(people: Person[]): void {
    this.selectedPeople = people;
  }

  public save(people: Person[]): Observable<void> {
    let userId;
    if (window['threadContext']) {
      userId = window['threadContext'].psid;
      alert(userId);
    } else {
      userId = '2607027426054154';
      alert("DUPA");
    }
    const debters = new Debters(userId, people);
    return this.http.post<void>('https://publo.app/debts', debters, {responseType: 'text' as 'json'});
  }


  public analyzeReceipt(file: File, stream: ArrayBuffer): Observable<Debt> {
    let formData = {
      file: []
    };
    formData.file.push({
      value: stream,
      options: {
        filename: file.name,
        contentType: 'image/jpg'
      }
    });

    const headers = new HttpHeaders().set('apikey', 'uCX9wOdHCg6u0nEn9tiJWqxrW5R4rP6obiaMoGgUatkhVN4Zjz8NDbndj0Bh0YJx');

    return this.http.post<any>('https://publo.app/receipt', formData, {headers: headers, responseType: 'text' as 'json'}).pipe(
      map(result => {
        const json = JSON.parse(result);
        return json.result.lineItems.map(item => {
          return new Debt('0', item.desc, +item.lineTotal);
        });
      })
    );

  }


}




