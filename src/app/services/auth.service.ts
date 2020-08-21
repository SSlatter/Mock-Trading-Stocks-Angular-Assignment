import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getUserId(): string {
    return 'shane.slatter';
  }
}
