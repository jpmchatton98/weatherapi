export class Location {
  name: string = "";
  region: string = "";
}

export class Condition {
  text: string = "";
  icon: string = "";
  code: number = 0;
}

export class Weather {
  id: number = 0; // For getting specific weather items

  search: string = ""; // The value that was searched to reach this object

  location: Location = new Location(); // City and state

  last_updated_epoch: number = 0; // Updated for calculations
  last_updated: string = ""; // Updated in a human-readable format

  // Unitless fields
  condition: Condition = new Condition(); // Condition of weather (clear, rain, snow, etc)
  humidity: number = 0; // Humidity as percentage
  cloud: number = 0; // Cloud cover as percentage
  wind_dir: string = ""; // Wind direction (compass directions)

  // Imperial unit fields
  temp_f: number = 0; // Temperature in Farenheit
  feelslike_f: number = 0; // Feels-like temperature in Farenheit

  wind_mph: number = 0; // Wind speed in miles per hour
  gust_mph: number = 0; // Wind gust speed in miles per hour

  pressure_in: number = 0; // Pressure in inches

  precip_in: number = 0; // Precipitation in inches

  vis_miles: number = 0; // Visibility in miles

  // Metric unit fields
  temp_c: number = 0; // Temperature in Celsius
  feelslike_c: number = 0; // Feels-like temperature in Celsius

  wind_kph: number = 0; // Wind speed in kilometers per hour
  gust_kph: number = 0; // Wind gust speed in kilometers per hour

  pressure_mb: number = 0; // Pressure in millibars

  precip_mm: number = 0; // Precipitation in millimeters

  vis_km: number = 0; // Visibility in kilometers
}
