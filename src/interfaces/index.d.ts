export interface ICategory {
  id: number;
  title: string;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  createdAt: string;
  category: { id: number };
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
  created_at: string;
}

export interface IService {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
