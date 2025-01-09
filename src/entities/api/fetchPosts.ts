// services/fetchPosts.ts
import axios from "axios";
import { ContentI } from "@/features/contents/config/Content";

export const fetchPosts = async (): Promise<ContentI[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/api/v1/users/content`
  );
  return response.data.result.mockData;
};
