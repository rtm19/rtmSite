import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';   
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export interface AuthResponseData{
    idToken : string;
    kind : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
}

@Injectable({providedIn : 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient , private router: Router , private afAuth : AngularFireAuth){}

    signUp(eMail : string , pwd : string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5qQqn1tV4FEpnYwBo-iSaDbCyPUckLHw' , 
        {
            email : eMail ,
            password : pwd ,
            returnSecureToken : true
        }).pipe(catchError(this.handleError) , tap(resData => {
            this.handleAuthentication(resData.email, resData.localId , resData.idToken , +resData.expiresIn);
        }));
    }

    login(eMail : string , pwd : string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5qQqn1tV4FEpnYwBo-iSaDbCyPUckLHw' ,
        {
            email : eMail ,
            password : pwd ,
            returnSecureToken : true
        }).pipe(catchError(this.handleError) , tap(resData => {
            this.handleAuthentication(resData.email, resData.localId , resData.idToken , +resData.expiresIn);
        }) );
    }

    signInRegular(email, password) {
        const credential = firebase.auth.EmailAuthProvider.credential( email, password );
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    autoLogin(){
        const userData : {
            email : string ; 
            id : string ;
            _token : string ;
            _tokenExpirationDate : string;
        } = JSON.parse(localStorage.getItem('userData')) ;

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email , userData.id , userData._token , new Date(userData._tokenExpirationDate) )

        if(loadedUser.token){           
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        } , expirationDuration );
    }
  
    public handleAuthentication(email : string , userId : string , token : string , expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData' , JSON.stringify(user) );
    }

    private handleError(errorRes : HttpErrorResponse){
        let errorMsg = 'An unknown error occurred!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }            
            switch (errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMsg = 'The email address is already in use by another account';
                    break;
                case 'EMAIL_NOT_FOUND': 
                    errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMsg = 'The password is invalid or the user does not have a password';
                    break;
            }
            return throwError(errorMsg);
    }
}