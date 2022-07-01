import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators'
import { Weather } from '../../models/weather';
import { select, Store } from '@ngrx/store';
import { selectWeathers, selectWeathersSort } from '../store/selector/weather.selectors';
import { WeatherState } from '../store/reducer/weather.reducer';
import { deleteWeathers } from '../store/action/weather.actions';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit {
  // Booleans to handle whether to show the columns on the weather table
  show_location: boolean = true;
  show_updated: boolean = true;
  show_condition: boolean = true;
  show_temp_f: boolean = true;
  show_temp_c: boolean = true;
  show_wind_mph: boolean = true;
  show_wind_kph: boolean = false;
  show_gust_mph: boolean = false;
  show_gust_kph: boolean = false;
  show_humidity: boolean = true;
  show_cloud: boolean = true;
  show_precip_in: boolean = false;
  show_precip_mm: boolean = false;
  show_pressure_in: boolean = false;
  show_pressure_mb: boolean = false;
  show_vis_mi: boolean = false;
  show_vis_km: boolean = false;

  weather_list$: Observable<Weather[]>;
  sort_field = 'last_updated_epoch' // Default sort by last updated
  ascending = false; // Default sort descending

  constructor(private store: Store<WeatherState>) {
    this.weather_list$ = this.store.pipe(select(selectWeathers)); // Get the weather list
    this.weather_list$.subscribe(x => { // Subscribe to the list and re-sort it when it changes
      this.reSort()
    })
  }

  deleteWeather(search: string) {
    this.store.dispatch(deleteWeathers(search))
  }

  reSort() { // Re-sort the weather list with the current parameters
    this.weather_list$ = this.store.pipe(select(selectWeathersSort(this.sort_field, this.ascending)));
  }

  sortWeathers(field: string) { // Sort the weather list by a given parameter, defaulting to ascending and alternating if that field was already sorted
    if (this.isSortedEither(field)) { // If the clicked field is already sorted
      this.ascending = !this.ascending; // Invert the sort direction
    }
    else { // If a different field is sorted
      this.ascending = true; // Sort ascending by default
    }

    this.sort_field = field; // Set the sort field
    this.weather_list$ = this.store.pipe(select(selectWeathersSort(this.sort_field, this.ascending))); // Get the data
  }

  isSortedEither(field: string) { // Returns true if the field is the one being sorted by, regardless of direction
    return this.isSorted(field, true) || this.isSorted(field, false);
  }

  isSorted(field: string, ascending: boolean) { // Returns true if the field is the one being sorted on, in the given direction
    return this.sort_field === field && this.ascending === ascending;
  }

  ngOnInit(): void {
  }

  toggle_field(field: string): void { // Toggle a field's visibility on or off
    switch(field) {
      case 'location':
        this.show_location = !this.show_location;
        break;
      case 'updated':
        this.show_updated = !this.show_updated;
        break;
      case 'condition':
        this.show_condition = !this.show_condition;
        break;
      case 'temp_f':
        this.show_temp_f = !this.show_temp_f;
        break;
      case 'temp_c':
        this.show_temp_c = !this.show_temp_c;
        break;
      case 'wind_mph':
        this.show_wind_mph = !this.show_wind_mph;
        break;
      case 'wind_kph':
        this.show_wind_kph = !this.show_wind_kph;
        break;
      case 'gust_mph':
        this.show_gust_mph = !this.show_gust_mph;
        break;
      case 'gust_kph':
        this.show_gust_kph = !this.show_gust_kph;
        break;
      case 'humidity':
        this.show_humidity = !this.show_humidity;
        break;
      case 'cloud':
        this.show_cloud = !this.show_cloud;
        break;
      case 'precip_in':
        this.show_precip_in = !this.show_precip_in;
        break;
      case 'precip_mm':
        this.show_precip_mm = !this.show_precip_mm;
        break;
      case 'pressure_in':
        this.show_pressure_in = !this.show_pressure_in;
        break;
      case 'pressure_mb':
        this.show_pressure_mb = !this.show_pressure_mb;
        break;
      case 'vis_mi':
        this.show_vis_mi = !this.show_vis_mi;
        break;
      case 'vis_km':
        this.show_vis_km = !this.show_vis_km;
        break;
    }
  }

  set_metric(): void { // Set to metric units of the current fields
    this.show_temp_c = this.show_temp_f
    this.show_temp_f = false

    this.show_wind_kph = this.show_wind_mph
    this.show_wind_mph = false

    this.show_gust_kph = this.show_gust_mph
    this.show_gust_mph = false

    this.show_precip_mm = this.show_precip_in
    this.show_precip_in = false

    this.show_pressure_mb = this.show_pressure_in
    this.show_pressure_in = false

    this.show_vis_km = this.show_vis_mi
    this.show_vis_mi = false
  }

  set_imperial(): void { // Set to imperial units of current fields
    this.show_temp_f = this.show_temp_c
    this.show_temp_c = false

    this.show_wind_mph = this.show_wind_kph
    this.show_wind_kph = false

    this.show_gust_mph = this.show_gust_kph
    this.show_gust_kph = false

    this.show_precip_in = this.show_precip_mm
    this.show_precip_mm = false

    this.show_pressure_in = this.show_pressure_mb
    this.show_pressure_mb = false

    this.show_vis_mi = this.show_vis_km
    this.show_vis_km = false
  }
}
