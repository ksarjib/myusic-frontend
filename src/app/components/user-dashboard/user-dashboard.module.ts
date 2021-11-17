import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { SharedModule } from '../footer/shared.module';

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: UserDashboardComponent
            },

        ])
    ],
    exports: [],
    providers: [],
    bootstrap: []
})
export class UserDashboardModule { }

