import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { getDate, getWeatherIconCode } from '../utils';
import { PropagateLoader } from 'react-spinners';
import { WeatherData } from '../type';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const buildIconURL = (weatherDescription: string) => {
  return `http://openweathermap.org/img/w/${getWeatherIconCode(
    weatherDescription
  )}.png`;
};

const Wrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  overflow: hidden;
`;

const CardBox = styled.div<{ isLastChild?: boolean }>`
  width: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: #cce5ed;
  background-color: #d1eefc;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  text-align: center;
  border-right: ${(props) =>
    css`
      ${(props.isLastChild as boolean) ? '1px solid #fff' : ''}
    `};
`;

const WeatherIcon = styled.img`
  height: 48px;
  margin: 1px 4px 0;
  width: 48px;
`;

const TodaysCard = styled(CardBox)`
  width: 100%;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;

  & div:nth-child(1) {
    margin-bottom: 20px;
  }

  & img {
    height: 100px;
    width: 100px;
    margin-bottom: -30px;
}
  }
  & .innerBox {
    display: flex;
    align-items: center;
    & .description {
      font-size: 40px;
      font-weight: 400;
      line-height: 5px;
    };
  };
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const Box = styled.section`
  width: fit-content;
  display: flex;
`;

const CenterText = styled.section`
  text-align: center;
`;

interface City {
  id: number;
  city: string;
  lon: string;
  lat: string;
  countryCode?: string;
}

interface Props {
  city: City;
}

const getFiveDaysForecast = (data: WeatherData[]): WeatherData[] => {
  const arr: any[] = [];
  data.forEach((element, idx) => {
    if (idx <= 4 && idx !== 0) {
      arr.push(element);
    }
  });
  return arr;
};

const WeatherCards: React.FC<Props> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const getWeatherData = async (arg: City) => {
    const options = {
      method: 'GET',
      url: `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?city=${city.city}&country=${city.countryCode}`,
      params: { units: 'metric' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_X_RAPIdAPI_KEY}`,
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then((response) => {
        setWeatherData(getFiveDaysForecast(response.data.data));
      })
      .catch((error) => {
        console.error(error);
        toast(error.response.data.message);
      });
  };

  useEffect(() => {
    getWeatherData(city);
  }, [city.city]);

  return (
    <>
      {weatherData.length > 0 ? (
        <Wrapper>
          <>
            <TodaysCard>
              <div>Today</div>
              <div className="innerBox">
                <div>
                  <WeatherIcon
                    src={buildIconURL(weatherData[0].weather.description)}
                    alt="Weather icon"
                  />
                </div>
                <div>
                  <span className="description">
                    {Math.trunc(weatherData[0].temp)}°
                  </span>
                  <br />
                  <span>{weatherData[0].weather.description}</span>
                </div>
              </div>
            </TodaysCard>
          </>
          <Box>
            {weatherData.map(
              ({ ts, temp, weather: { description } }: WeatherData, idx) => (
                <CardBox key={ts} isLastChild={idx === 3 ? true : false}>
                  <div>{getDate(ts)}</div>
                  <div>
                    <WeatherIcon
                      alt="Weather icon"
                      src={buildIconURL(description)}
                    />
                  </div>
                  <BoldText>{Math.trunc(temp)}°</BoldText>
                </CardBox>
              )
            )}
          </Box>
        </Wrapper>
      ) : (
        <CenterText>
          <PropagateLoader color="#2e6f85" />
        </CenterText>
      )}
      <div>
        <ToastContainer hideProgressBar />
      </div>
    </>
  );
};

export default WeatherCards;
