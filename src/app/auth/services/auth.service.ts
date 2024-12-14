import { Injectable, inject, signal ,WritableSignal ,computed} from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto , user, UserInfo} from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable , tap} from 'rxjs';
import {token , user_KEY } from "../../../config/const.config"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userSignal : WritableSignal <user | null > = signal (null)
  constructor() {
    const storedUser = localStorage.getItem(user_KEY);
    if (storedUser) {
      this.userSignal.set(JSON.parse(storedUser) as user);
    }
  }


  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user = {
          id: response.id,
          ttl: response.ttl,
          created: response.created,
          userId: response.userId,
          email: credentials.email,
        }
        this.userSignal.set(user);
        localStorage.setItem(user_KEY,  JSON.stringify(user)
    );

      })
    );
  }

  usergetter = computed< UserInfo | null>(() => {
    const user = this.userSignal();
    return user ? { id: user.id, email: user.email } : null;
  });

  isAuthenticated = computed(() => this.userSignal() !== null);


  logout() {
    this.userSignal.set(null)
    localStorage.removeItem(token);
    localStorage.removeItem(user_KEY)
  }
}
