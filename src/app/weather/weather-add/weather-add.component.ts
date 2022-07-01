import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Weather } from '../../models/weather';
import { WeatherState } from '../store/reducer/weather.reducer';
import { SearchService } from '../search.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-add',
  templateUrl: './weather-add.component.html',
  styleUrls: ['./weather-add.component.scss']
})
export class WeatherAddComponent implements OnInit {
  constructor(private store: Store<WeatherState>, public searchService: SearchService) {

  }

  addWeather(search: string): void {
    this.searchService.store = this.store;
    this.searchService.addWeatherItem(search);
  }

  ngOnInit(): void {
  }
}
