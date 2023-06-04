"use client"

import { Country, City } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { GlobeIcon } from '@heroicons/react/solid';

type countryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null

const options = Country.getAllCountries().map(country => {
  return {
    value: {
      latitude: country.latitude,
      longitude: country.longitude,
      isoCode: country.isoCode,
    },
    label: country.name,
  }
})


export default function CityPicker() {

  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: countryOption) => {
    setSelectedCity(null);
    setSelectedCountry(option);
  }

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`);
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center space-x-2 text-white/80'>
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">
            Country
          </label>
        </div>
        <Select
          className="text-black"
          options={options}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />
      </div>
      {selectedCountry && (

        <div className='space-y-2'>
          <div className='flex items-center space-x-2 text-white/80'>
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="city">
              City
            </label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(state => {
              return {
                value: {
                  latitude: state.latitude!,
                  longitude: state.longitude!,
                  countryCode: state.countryCode,
                  name: state.name,
                  stateCode: state.stateCode,
                },
                label: state.name,
              }
            }
            )}
          />
        </div>
      )}
    </div>
  );
}