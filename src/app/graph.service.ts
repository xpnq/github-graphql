import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { }

  public getData(){
    let accessToken = 'access-token-of-github-api-goes-here';
    let url = "https://api.github.com/graphql";
    let data = {"query": `{
      viewer {
        name
        repositories(first: 100) {
          nodes {
            name
            url
            collaborators(first: 100) {
              edges {
                node {
                  login,
                  avatarUrl
                }
              }
            }
          }
        }
      }
    }
    `};
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `Bearer ${accessToken}`
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return this.http
      .post<any>(url, data, requestOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
