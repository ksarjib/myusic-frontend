import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../footer/shared.module';
import { ArtistDashboardComponent } from '../artist-dashboard/artist-dashboard.component';

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: ArtistDashboardComponent
            },

        ])
    ],
    exports: [],
    providers: [],
    bootstrap: []
})
export class ArtistDashboardModule { }

