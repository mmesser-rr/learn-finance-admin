import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import useInput from './useInput';

const LocationInput = () => {
  const address = useInput('');
  const inputProps = {
    onChange: address.onChange,
    value: address.value,
  };
  return (
    <Wrapper>
      <TextField
        sx={{ m: 1 }}
        className="mt-8 mb-16"
        label="Address"
        variant="filled"
        inputProps={inputProps}
        fullWidth
      />

      {address.suggestions?.length > 0 && (
        <SuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                key={index}
                onClick={() => {
                  ParseAddress(suggestion);
                  address.setValue(suggestion.place_name);
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            );
          })}
        </SuggestionWrapper>
      )}
    </Wrapper>
  );
};

const ParseAddress = (location) => {
  const { geometry, context, place_name: fullName, place_type: placeTypeArr, text } = location;
  const { coordinates } = geometry;
  const placeType = placeTypeArr[0];
  const locationCoords = { lat: coordinates[1], lon: coordinates[0] };
  const city = getLocationContextValue(context, 'place');
  const placeNameClean = getPlaceName(placeType, text, fullName);
  // Strip Name from Address on POI

  const locationDetail = {
    address: getBaseAddress(fullName, city, placeType, text),
    unit: '',
    city,
    state: getLocationContextValue(context, 'region'),
    zipCode: getLocationContextValue(context, 'postcode'),
    country: getLocationContextValue(context, 'country'),
    name: placeNameClean,
    raw: fullName,
  };
};

const getPlaceName = (type, text, name) => {
  if (type === 'poi') {
    return text;
  }
  return name;
};
const getBaseAddress = (name, city, type, text) => {
  city = `, ${city}`;
  const addr = name.substring(0, name.indexOf(city));
  if (type === 'poi') {
    if (addr.length > text.length) {
      return addr.replace(`${text}, `, '');
    }
  }
  return addr;
};
const getLocationContextValue = (context, key) => {
  for (let i = 0; i < context.length; i += 1) {
    if (context[i].id.startsWith(key)) {
      return context[i].text;
    }
  }
  return '';
};

export default LocationInput;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  background: white;
  border: none;
  padding: 10px 20px;
  border-radius: 0px;
  border-bottom: 1px red solid;
  position: relative;
  display: grid;
  justify-self: center;
  &:focus {
    outline: none;
    border-radius: ${(props) => props.isTyping && '10px 10px 0px 0px'};
  }
`;

const SuggestionWrapper = styled.div`
  color: #ffffff;
  background: #24272a;
  box-shadow: 0px 5px 10px gray;
  position: absolute;
  margin: -15px 8px 10px 8px;
  padding: 10px 20px;
  border-radius: 0px 0px 10px 10px;
  z-index: 99;
`;

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 100%;
  line-height: 33px;
`;
