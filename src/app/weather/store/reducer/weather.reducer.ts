import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as WeatherActions from '../action/weather.actions'
import { Weather } from '../../../models/weather'

export const weatherFeatureKey = 'weather';
export const adapter: EntityAdapter<Weather> = createEntityAdapter<Weather>();

export interface WeatherState {
  weather_list: Weather[];
}

export const initialState: WeatherState = {
  weather_list: []
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.addWeathers,
    (state: WeatherState, {weather}) =>
      ({...state,
        weather_list: [...state.weather_list, weather] // Make an array of the exploded previous array and the new item
      })),
  on(WeatherActions.deleteWeathers,
    (state: WeatherState, {search}) =>
    ({...state,
      weather_list: [...state.weather_list].filter((element) => {return element.search !== search}) // Filter out the relevant item
    }))
);

export function reducer (state: WeatherState | undefined, action: Action): any {
  return weatherReducer(state, action)
}
