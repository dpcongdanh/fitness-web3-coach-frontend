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
  created_at: string;
}
