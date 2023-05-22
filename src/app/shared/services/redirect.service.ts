import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }

  public redirectRegister(url: string): void {
    this.router.navigate([url]);
  }
  public redirectRegisterResovler(url: string, id: string): void {
    this.router.navigate([url, id]);
  }
  public redirectRegisterWithParams(url: string, params: any): void {
    this.router.navigate([url], {
      replaceUrl: true,
      queryParams: params
    });
  }
}
