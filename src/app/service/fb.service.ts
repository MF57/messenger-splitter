import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FbService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://graph.facebook.com/v5.0/';
  //TODO This is only sandbox token - do not keep it in the frontend in the production solution
  private token = 'EAAF1LZBGkrzABAFJLa0bpknz9kCx28xCcgO7JNLcAFMKhj4L30mZBYEtasQadDdkdXArpIzdipSkckhDhKRlUFs2l4NT2j68wwBwNdRZCJO90c1FpcmsDFON3g9v5W0AUO1qOsDtZCrl3KROgGeQhmDG9EBFEk3Riwwyy3szY8e1n7LcqKHw0HX9z8C5AHYZD';
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

