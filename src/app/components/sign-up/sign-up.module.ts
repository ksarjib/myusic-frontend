import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up.component';



@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SignUpComponent }
        ])
    ],
    providers: [],
    bootstrap: [SignUpComponent]
})
export class SignUpModule { }
