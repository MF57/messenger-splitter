import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FbService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://graph.facebook.com/v5.0/';
  private token = 'EAAF1LZBGkrzABANxAm9ZCcUPAWNptrhvV0LbjdZCssVcgDvaeF3u7mTiojaLjCOlOLo9qmaOoYCEsvhd1jRr7DD4ZBPbFET1A7s5TSShEPIR5nv4YNGcZBqRnDEoZCVKJQocNiDC72bYQKKoXTf9ZAVlduYqxDgUZA5iJAsLXzg585XzuZBbnsGlZB6SwSiZA4uWtAu518Y5ebRwAZDZD';
  private url = 'https://graph.facebook.com/v5.0/2607027426054154/threads';


  getAvailablePeople(): Observable<any> {
    let userId;
    if (window["thread_context"]) {
      userId = window["thread_context"].psid;
      alert(userId);
    } else {
      userId = "2607027426054154";
    }
    return this.http.get<any>(this.baseUrl + userId + '/threads?access_token=' + this.token)
      .pipe(switchMap(result => {
        return forkJoin(result.data.map(thread => {
          return this.http.get<any>(this.baseUrl + thread.id + '?fields=participants&access_token=' + this.token).pipe(
            switchMap(participants => {
                return forkJoin(participants.participants.data.map(participant => {
                  return this.http.get<any>(this.baseUrl + participant.id + '?access_token=' + this.token);
                }));
              }
            )
          );
        }));
      }))
  }

}

