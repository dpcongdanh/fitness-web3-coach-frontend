import { StringIfPlural } from "react-i18next";

export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  user_id: number;
  title: string;
  summary: string;
  cover: string;
  body: string;
  // status: "published" | "draft" | "rejected";
  created_at: string;
  // category: { id: number };
}

export interface IComment {
  id: number;
  user_uuid: string;
  post_id: string;
  body: string;
  created_at: string;
}

export interface IProfile {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: date;
  role: string;
  country: string;
}

export interface ITrainer {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  location: string;
  about: string;
  avatar: string;
  services: number[];
  video: string;
  certifications: number[];
  created_at: string;
}

export interface ISchedule {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  customer_id: string;
  trainer_id: number;
  service: number;
  training_package: number;
  created_at: string;
}

export interface ISelectedEventInfo {
  id: number;
  title: string;
  start: string;
  end: string;
  extendedProps: IExtendedPropsEvent;
}

export interface IExtendedPropsEvent {
  description: string;
  customer_id: string;
  trainer_id: number;
  service: number;
  training_package: number;
  created_at: string;
}

export interface ICertification {
  id: number;
  name: string;
  image: string;
  created_at: string;
}

export interface IService {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IGallery {
  id: number;
  user_id: number;
  image: string;
  title: string;
  created_at: string;
}

export interface ICourse {
  id: number;
  user_id: number;
  name: string;
  description: string[];
  image: string;
  plan: string;
  price: string;
  created_at: string;
}

export interface ITrainingPackage {
  id: number;
  user_id: number;
  name: string;
  description: string[];
  image: string;
  session_count: string;
  price_per_session: string;
  // services: string;
  created_at: string;
}

export interface IProduct {
  id: number;
  user_id: number;
  name: string;
  description: string[];
  image: string;
  price: string;
  created_at: string;
}
