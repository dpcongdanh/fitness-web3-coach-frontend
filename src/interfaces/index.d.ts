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

export interface IProduct {
  id: number;
  user_id: number;
  name: string;
  description: string[];
  image: string;
  plan: string;
  price: string;
  created_at: string;
}
