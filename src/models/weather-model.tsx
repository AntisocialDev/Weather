export interface ICurrentWeather{
    LocalObservationDateTime: string;
    WeatherText: string;
    WeatherIcon: number;
    IsDayTime: boolean;
    Temperature: {
       Metric: ITempStructure;
       Imperial: ITempStructure;
    }
    RealFeelTemperature: {
        Metric: IRealFeelTemp;
        Imperial: IRealFeelTemp;
    }
    RelativeHumidity: number;
    Wind: {
        Direction: {
            Degrees: number;
            English: string;
        },
        Speed: {
            Metric: {
                Value: number;
                Unit: string;
            }
        }
    };
    UVIndex: number;
    UVIndexText: string;
    TemperatureSummary:{
        Past24HourRange: {
            Minimum: {
                Metric: ITempStructure;
                Imperial: ITempStructure
            };
            Maximum: {
                Metric: ITempStructure;
                Imperial: ITempStructure
            }
        };
    }
    Pressure:{
        Metric: ITempStructure;
        Imperial: ITempStructure;
    }
    
}

export interface ITempStructure {
    Value: number;
    Unit: string;
    UnitType: number;
}

interface IRealFeelTemp extends ITempStructure{
    Phrase: string;
}



