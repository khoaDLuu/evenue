// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SupportedCurrency = {
  "USD": "USD",
  "VND": "VND",
  "EUR": "EUR"
};

const UnitOfArea = {
  "SQFT": "sqft",
  "SQM": "sqm"
};

const DayOfWeek = {
  "MON": "Mon",
  "TUE": "Tue",
  "WED": "Wed",
  "THU": "Thu",
  "FRI": "Fri",
  "SAT": "Sat",
  "SUN": "Sun"
};

const { User, Review, Venue, Photo, S3Object, Pricing, HourlyPricing, Category, Extra, Capacity, OperatingHour } = initSchema(schema);

export {
  User,
  Review,
  Venue,
  SupportedCurrency,
  UnitOfArea,
  DayOfWeek,
  Photo,
  S3Object,
  Pricing,
  HourlyPricing,
  Category,
  Extra,
  Capacity,
  OperatingHour
};