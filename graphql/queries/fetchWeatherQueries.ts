import { gql} from "@apollo/client"

const fetchWeatherQuery = gql`
  query MyQuery(
$current_weather:String
$daily:String = "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
$hourly:String = "temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky"
$latitude:String!
$longitude:String!
$timezone:String!
  ){
    myQuery(
      current_weather: $current_weather
      daily:$daily
      hourly:$hourly
      latitude:$latitude
      longitude:$longitude
      timezone:$timezone
    ) {
      elevation
      generationtime_ms
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
      current_weather {
        is_day
        windspeed
        temperature
        time
        weathercode
        winddirection
      }
      daily {
        apparent_temperature_max
        sunrise
        apparent_temperature_min
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      hourly {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
      }
      hourly_units {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        uv_index
        time
        uv_index_clear_sky
        windgusts_10m
      }
    }
  }
`;


export default fetchWeatherQuery;