import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserAPIUserOne } from 'projects/ui/src/public-api';
import { BehaviorSubject } from 'rxjs';
import { UiService } from 'ui';
import { Router } from '@angular/router';

const USER_API = 'https://codingfactory.ddns.net/api/user'


@Injectable({
  providedIn: 'root'
})
export class AppService {

private isLoadingSubject = new BehaviorSubject<boolean>(false)
isLoading$ = this.isLoadingSubject.asObservable()

  private loggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private loggedInUserFullnameSubject = new BehaviorSubject<string>('')
  loggedInUserFullname$ = this.loggedInUserFullnameSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private alertService: UiService,
    private router: Router) {}

  login(username:string, password: string) {
    this.setIsLoading(true);
    this.http.get<UserAPIUserOne>(`${USER_API}/findone/${username}`)
    .subscribe((user) => {
      if (user.data && user.data.password === password) {
      this.loggedInSubject.next(user.data.password === password);
      this.loggedInUserFullnameSubject.next(
        `${user.data.name} ${user.data.surname}`
        );

        this.alertService.newAlert({
          type: 'success',
          heading: `Welcome ${this.loggedInUserFullnameSubject.value}`,
          text: 'Nice to see you again!'
        })
        this.router.navigate(['/user']);
      } else {
        this.alertService.newAlert({
        type: 'danger', 
        heading: 'Authentication Error', 
        text: 'Wrong username or password'})
      }
      this.setIsLoading(false);
    });
  }

  logout() {
    this.loggedInSubject.next(false)
    this.loggedInUserFullnameSubject.next('');
    this.router.navigate([''])
  }

  setIsLoading(isLoading: boolean){
    this.isLoadingSubject.next(isLoading);
  }
}
