import { supabaseClient } from "utility";

export const uploadImage = async (
  imageFile: File,
  bucket: string,
  folderPath: string
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(folderPath + imageFile.name, imageFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getPublicImageUrl = async (bucket: string, path: string) => {
  const { data, error } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(path);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const getSignedImageUrl = async (bucket: string, path: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .createSignedUrl(path, 60);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};

export const downloadImage = async (bucket: string, path: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .download(path);

  if (error) return Promise.reject(error);

  if (data) return Promise.resolve(data);
};
