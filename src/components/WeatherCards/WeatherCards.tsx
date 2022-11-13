import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDate, getWeatherIconCode } from '../utils';
import { PropagateLoader } from 'react-spinners';
import { WeatherData } from '../type';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Wrapper,
  CardBox,
  WeatherIcon,
  TodaysCard,
  BoldText,
  Box,
  CenterText,
} from './styles';

const buildIconURL = (weatherDescription: string) => {
  return `http://openweathermap.org/img/w/${getWeatherIconCode(
    weatherDescription
  )}.png`;
};
const number = 5;
interface City {
  id: number;
  city: string;
  lon: string;
  lat: string;
  countryTwoLetterAbbr?: string;
}

interface Props {
  city: City;
}

const getFiveDaysForecast = (data: WeatherData[]): WeatherData[] => {
  const arr: any[] = [];
  data.forEach((element, idx) => {
    if (idx <= number && idx !== 0) {
      arr.push(element);
    }
  });
  return arr;
};

const WeatherCards: React.FC<Props> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const controller = new AbortController();
  const signal = controller.signal;

  const getWeatherData = async (arg: City) => {
    const options = {
      method: 'GET',
      url: `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?city=${city.city}&country=${city.countryTwoLetterAbbr}`,
      params: { units: 'metric' },
      signal,
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
    return () => {
      controller.abort();
    };
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
                <CardBox
                  key={ts}
                  isLastChild={idx === number - 1 ? true : false}
                >
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
