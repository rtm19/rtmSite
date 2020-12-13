import { Component, ComponentFactoryResolver, ViewChild, ComponentRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error : string = null;
    @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;
    private closeSub : Subscription;
    
    constructor(private authService : AuthService , private router: Router , private componentFactoryResolver : ComponentFactoryResolver){}

    onHandleError(){
        this.error = null;
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form : NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        // let authObs : Observable<AuthResponseData>;
        let authObs : Promise<firebase.auth.UserCredential>;
        this.isLoading = true;

        if(this.isLoginMode){
            // authObs = this.authService.login(email , password);
            console.log("will login now");
            this.authService.signInRegular(email, password).then((res) => {
                console.log("success");
                console.log(res);
                this.isLoading = false;
                this.authService.handleAuthentication(res.user.email, "", null , 100000);
                this.router.navigate(['/upload']);
             })
             .catch((errorMsg) => {
                console.log("error");
                console.log(errorMsg);       
                    this.error = errorMsg;
                    this.showErrorAlert(errorMsg);
                    this.isLoading = false;
             });
    ; 
            console.log("logged in");       
        }else{
            //authObs = this.authService.signUp(email , password);
        }

        // authObs.subscribe(resData => {
        //     console.log(resData);
        //     this.isLoading = false;
        //     this.router.navigate(['/upload']);     //comment
        // },
        // errorMsg => {
        //     console.log(errorMsg);       
        //     this.error = errorMsg;
        //     this.showErrorAlert(errorMsg);
        //     this.isLoading = false;
        // }
        // );

        
        form.reset();
    }

    onLogout(){
        this.authService.logout();
    }

    showErrorAlert(message: string){
        //const alertCmp = new AlertComponent()
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }        
    }
  
}