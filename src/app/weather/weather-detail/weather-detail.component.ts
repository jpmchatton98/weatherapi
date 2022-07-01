import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject, defaultIfEmpty } from 'rxjs';
import { map, scan } from 'rxjs/operators'
import { Weather } from '../../models/weather';
import { select, Store } from '@ngrx/store';
import { selectWeatherByIndex } from '../store/selector/weather.selectors';
import { WeatherState } from '../store/reducer/weather.reducer';
import { deleteWeathers } from '../store/action/weather.actions';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

  weather$: Observable<Weather[]>;
  weather: Weather | undefined
  constructor(private store: Store<WeatherState>, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap; // Get the route parameters
    const weatherIndexFromRoute = Number(routeParams.get('weatherIndex')); // Get the index from the parameters
    this.weather$ = this.store.pipe(select(selectWeatherByIndex(weatherIndexFromRoute))) // Get the weather object
    this.weather$.subscribe(x => {
      this.weather = x[0] // Get the specific object to display
    })
  }

  ngOnInit(): void {

  }

}
