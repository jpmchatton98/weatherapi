import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWeather from '../reducer/weather.reducer'
import { Location, Weather } from '../../../models/weather'

export const selectWeatherState = createFeatureSelector<fromWeather.WeatherState>(
  fromWeather.weatherFeatureKey,
);

function getNumWeathers(list: Weather[]) {
  if (list !== undefined) {
    return list.length
  }
  return 0
}

// Returns the number of weather objects currently on the list
export const numWeathers = createSelector(
  selectWeatherState,
  (state: fromWeather.WeatherState) => getNumWeathers(state.weather_list)
)

// Select the full weather list with no sorting
export const selectWeathers = createSelector(
  selectWeatherState,
  (state: fromWeather.WeatherState) => state.weather_list
)

// Select a specific weather item by its location, for checking for duplicates
export const selectWeatherByLocation = (location: Location) => createSelector(
  selectWeatherState,
  (state: fromWeather.WeatherState) => state.weather_list.filter((element) => { return element.location.name === location.name && element.location.region === location.region })
)

// Select a specific weather item by index, for showing details
export const selectWeatherByIndex = (index: number) => createSelector(
  selectWeatherState,
  (state: fromWeather.WeatherState) => state.weather_list.filter((element) => { return element.id == index })
)

// Select the full weather list, sorted by the provided field and direction
export const selectWeathersSort = (field: string, ascending: boolean) => createSelector(
  selectWeathers,
  (weather_list: Weather[]) => [...weather_list].sort(function compare(a, b) {
    type WeatherKey = keyof Weather;
    const fieldKey: WeatherKey = field as WeatherKey;
    if (a[fieldKey] > b[fieldKey]) {
      if (ascending) {
        return 1;
      }
      return -1;
    }
    if (a[fieldKey] < b[fieldKey]) {
      if (ascending) {
        return -1;
      }
      return 1;
    }

    return 0;
  })
)
