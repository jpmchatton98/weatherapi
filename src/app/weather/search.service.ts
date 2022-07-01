import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { take } from 'rxjs/operators'
import { Location, Weather } from './../models/weather';
import { WeatherState } from './store/reducer/weather.reducer';
import { addWeathers } from './store/action/weather.actions';
import { HttpClient } from '@angular/common/http';
import { selectWeatherByLocation, numWeathers } from './store/selector/weather.selectors'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  weather: any;
  error: string = ""

  private url = "http://api.weatherapi.com/v1/current.json?key=8b4db65cdd1948cb9b852238222906";

  constructor(public store: Store<WeatherState>, private httpClient: HttpClient) { }

  addWeatherItem(search: string): void {
    this.httpClient.get(this.url + "&q=" + search).subscribe(Response => { // Make a get request to the api
        this.weather = Response;

        // Pull out the location data
        var name: string = this.weather.location.name;
        var region: string = this.weather.location.region;

        let l = new Location() // Make a location object

        // Assign the relevant data
        l.name = name
        l.region = region

        let existing: Weather | undefined
        let selectWeather = this.store.pipe(select(selectWeatherByLocation(l))) // Check to see if that location is on the list
        selectWeather.pipe(take(1)).subscribe(x => { // Only subscribe once so it doesn't store the additions
          if (x.length === 0) { // If it isn't
            this.store.pipe(select(numWeathers)).pipe(take(1)).subscribe(x => { // Get the number of current items
              let weather = this.weather.current; // Create a weather object
              weather.search = search;
              weather.location = this.weather.location;
              weather.id = x;

              let last_updated: Date = new Date() // Assign last updated since the one from the api doesn't update very often
              weather.last_updated = last_updated.toString()
              weather.last_updated_epoch = last_updated.valueOf()

              this.store.dispatch(addWeathers(weather));

              this.error = "" // Set the error message to empty
            })
          }
          else { // If it is on the list
            // Set the error message to let the user know
            this.error = "The area you are trying to search for has already been searched for.  Delete the existing record and try again.";
          }
        }, err => {}, () => {});
      },
      err => { // If there's an error in the request
        // Set the error message to the response's error message
        this.error = err.error.error.message;
      }
    )
  }
}
