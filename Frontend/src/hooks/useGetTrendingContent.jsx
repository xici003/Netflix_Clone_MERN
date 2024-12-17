import axios from "axios";
import { useContentStore } from "../store/content";
import { useEffect, useState } from "react";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);

  const { contentType } = useContentStore();

  useEffect(() => {
    if (!contentType) return null;
    const getTrendingContent = async () => {
      const responses = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(responses.data.content);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
