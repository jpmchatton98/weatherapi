import { createAction, props } from '@ngrx/store';
import { Weather } from '../../../models/weather'

export const addWeathers = createAction(
  '[Weather] Add Weathers',
  (weather: Weather) => ({weather})
);

export const deleteWeathers = createAction(
  '[Weather] Delete Weathers',
  (search: string) => ({search})
)
