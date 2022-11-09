import { useState } from 'react';
import styled, { css } from 'styled-components';
import './App.css';
import WeatherCards from './components/WeatherCards/WeatherCards';
import { City } from './components/type';
import { cities } from './components/constants';

const Wrapper = styled.section`
  margin: 15px;
  text-align: center;
`;

const StyledButton = styled.button<{ active: boolean }>`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  width: 75px;
  margin: 15px;

  color: ${(props) =>
    css`
      ${props.active ? '#2e6f85' : ''}
    `};
  font-weight: ${(props) =>
    css`
      ${props.active ? 700 : ''}
    `};
`;

const App = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);

  const handleButtonClick = (city: City) => {
    setSelectedCity(city);
    cities.map((el) => {
      if (el.id === city.id) {
        el.isActive = true;
      } else {
        el.isActive = false;
      }
    });
  };
  return (
    <div className="App">
      <Wrapper>
        {cities.map((city) => (
          <StyledButton
            active={city.isActive}
            key={city.id}
            onClick={() => {
              handleButtonClick(city);
            }}
          >
            {city.city}
          </StyledButton>
        ))}
      </Wrapper>

      <WeatherCards city={selectedCity} />
    </div>
  );
};

export default App;
