// services/fetchPosts.ts
import axios from "axios";
import { ContentI } from "@/features/contents/config/Content";

export const fetchPosts = async (): Promise<ContentI[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_HTTP_LOCAL}/content`
  );
  return response.data.result.mockData;
};
