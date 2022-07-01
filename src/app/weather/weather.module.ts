import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherViewComponent } from './weather-view/weather-view.component';
import { WeatherAddComponent } from './weather-add/weather-add.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component'
import { StoreModule } from '@ngrx/store';
import { weatherFeatureKey, reducer } from './store/reducer/weather.reducer';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: WeatherViewComponent },
  { path: "detail/:weatherIndex", component: WeatherDetailComponent }
];

@NgModule({
  declarations: [
    WeatherViewComponent,
    WeatherAddComponent,
    WeatherDetailComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(weatherFeatureKey, reducer),
    RouterModule.forRoot(routes)
  ],
  exports: [
    WeatherViewComponent,
    WeatherAddComponent,
    WeatherDetailComponent,
    RouterModule
  ]
})
export class WeatherModule {

}
