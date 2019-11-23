import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FbService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://graph.facebook.com/v5.0/';
  private token = 'EAAF1LZBGkrzABAKoNxF4j1zzkjYA1UC7qR5aTMqFLE7MYyLDSZBicZC5DZBfxBaG4otZB8ZCZCJSvP9z4avEfK1EWZA9UXdgsmV1iDDeQLHVcYk9BgVwq2KV04k8dAjT4o7Ex8ODEgWb5gnysfpQ9exUxxCY6AGZCMpRkW2aY2hbV8ZAFK74LKlMk24LtiDxWuWd7qOGpBzMlGDAZDZD';
  private url = 'https://graph.facebook.com/v5.0/2607027426054154/threads';


  getAvailablePeople(): Observable<any> {
    let userId;
    if (window["threadContext"]) {
      userId = window["threadContext"].psid;
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

