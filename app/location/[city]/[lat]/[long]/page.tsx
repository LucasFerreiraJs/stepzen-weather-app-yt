
import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
import HumidityChart from '@/components/HumidityChart';
import InformationPanel from '@/components/InformationPainel';
import RainChart from '@/components/RainChart';
import StatCard from '@/components/StatCard';
import TempChart from '@/components/TempChart';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';


type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  }
}

export default async function WeatherPage({ params: { city, lat, long } }: Props) {

  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "GMT",
    }
  });

  const results: Root = data.myQuery;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={city}
        results={results}
        lat={lat}
        long={long}
      />

      <div className='flex-1 p-5 lg:p-10'>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">Last Updated at: {" "}
              {new Date(results.current_weather.time).toString()} ({results.timezone})
            </p>
          </div>

          <div className='m-2 mb-10'>
            <CalloutCard message='this is where gpt-3.5 summary will go!' />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
              color='yellow'
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
              color='green'
            />

            <div>
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color='rose'
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message={"The UV is high today, be sure to wear SPF!!"}
                  warning
                />

              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                color='cyan'
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color='violet'
              />
            </div>
          </div>
        </div>

        <hr className="mb-5"/>
        <div className='space-y-3'>
                {/* <TempChart/> */}
          <TempChart results={results}/>
          <RainChart results={results}/>
          <HumidityChart results={results}/>
                {/* <RainChart/> */}
                {/* <HumityCHart/> */}

        </div>

      </div>
    </div>
  )

}