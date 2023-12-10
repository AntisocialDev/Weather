import { ITempStructure } from "./weather-model";

export interface IForecast {
  headline: {
    Text: string;
  };
  DailyForecasts: [{
    Date: string;
    Temperature: {
        Minimum: ITempStructure,
        Maximum: ITempStructure,
    },
    Day:{
        Icon: number;
    },
    Night: {
        Icon: number;
    }
  }];
}
