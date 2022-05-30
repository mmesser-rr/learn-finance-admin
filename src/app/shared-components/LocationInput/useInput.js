import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const MAPBOX_TOKEN =
    'pk.eyJ1IjoiYmFua2RhbyIsImEiOiJjbDE1aTQyMDUwdGkxM2RydHo5N2twajgwIn0.v1ggUJ7PCs1vsQ5JDg16yw';

  const handleChange = async (event) => {
    setValue(event.target.value);

    try {
      const MAP_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true`;
      const response = await fetch(MAP_ENDPOINT);
      const results = await response.json();
      setSuggestions(results?.features);
    } catch (error) {
      console.log('LocationAutocomplete => useInput => error => ', error);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  };
};

export default useInput;
