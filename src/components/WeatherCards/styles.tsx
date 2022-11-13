import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  overflow: hidden;
`;

export const CardBox = styled.div<{ isLastChild?: boolean }>`
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

export const WeatherIcon = styled.img`
  height: 48px;
  margin: 1px 4px 0;
  width: 48px;
`;

export const TodaysCard = styled(CardBox)`
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

  & .innerBox {
    display: flex;
    align-items: center;
    & .description {
      font-size: 40px;
      font-weight: 400;
      line-height: 5px;
    }
  }
`;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const Box = styled.section`
  width: fit-content;
  display: flex;
`;

export const CenterText = styled.section`
  text-align: center;
`;
