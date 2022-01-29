import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum SupportedCurrency {
  USD = "USD",
  VND = "VND",
  EUR = "EUR"
}

export enum UnitOfArea {
  SQFT = "sqft",
  SQM = "sqm"
}

export enum DayOfWeek {
  MON = "Mon",
  TUE = "Tue",
  WED = "Wed",
  THU = "Thu",
  FRI = "Fri",
  SAT = "Sat",
  SUN = "Sun"
}

export declare class Photo {
  readonly name?: string;
  readonly fullsize: S3Object;
  readonly thumbnails?: (S3Object | null)[];
  constructor(init: ModelInit<Photo>);
}

export declare class S3Object {
  readonly region: string;
  readonly bucket: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class Pricing {
  readonly currency: SupportedCurrency | keyof typeof SupportedCurrency;
  readonly perHour?: (HourlyPricing | null)[];
  readonly perDay?: number;
  constructor(init: ModelInit<Pricing>);
}

export declare class HourlyPricing {
  readonly startHour: string;
  readonly endHour: string;
  readonly price: number;
  constructor(init: ModelInit<HourlyPricing>);
}

export declare class Category {
  readonly name: string;
  constructor(init: ModelInit<Category>);
}

export declare class Extra {
  readonly name: string;
  readonly type?: string;
  readonly price: number;
  constructor(init: ModelInit<Extra>);
}

export declare class Capacity {
  readonly unit?: UnitOfArea | keyof typeof UnitOfArea;
  readonly floorSize?: number;
  readonly recommendedGuestCount?: number;
  constructor(init: ModelInit<Capacity>);
}

export declare class OperatingHour {
  readonly daysOfWeek?: (DayOfWeek | null)[] | keyof typeof DayOfWeek;
  readonly startHour?: string;
  readonly endHour?: string;
  constructor(init: ModelInit<OperatingHour>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReviewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VenueMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly reviews?: (Review | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Review {
  readonly id: string;
  readonly venue?: Venue;
  readonly user?: User;
  readonly rating: number;
  readonly review?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userReviewsId?: string;
  readonly venueReviewsId?: string;
  constructor(init: ModelInit<Review, ReviewMetaData>);
  static copyOf(source: Review, mutator: (draft: MutableModel<Review, ReviewMetaData>) => MutableModel<Review, ReviewMetaData> | void): Review;
}

export declare class Venue {
  readonly id: string;
  readonly name: string;
  readonly headline: string;
  readonly description?: string;
  readonly photos: Photo[];
  readonly address: string;
  readonly city: string;
  readonly pricing: Pricing;
  readonly type: Category;
  readonly eventTypes?: string[];
  readonly published: boolean;
  readonly extras?: (Extra | null)[];
  readonly capacity?: Capacity;
  readonly operatingHours?: (OperatingHour | null)[];
  readonly reviews?: (Review | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Venue, VenueMetaData>);
  static copyOf(source: Venue, mutator: (draft: MutableModel<Venue, VenueMetaData>) => MutableModel<Venue, VenueMetaData> | void): Venue;
}