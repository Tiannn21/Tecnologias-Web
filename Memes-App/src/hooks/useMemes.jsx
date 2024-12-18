import { useState, useEffect } from "react";
import { getDataMemes } from "../services/memes";

const useMemes = (sortBy) => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMore, setIsMore] = useState(true);

  const uploadMemes = (uploadPage, sortBy) => {
    if (!isMore) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getDataMemes(uploadPage, 10,sortBy)
      .then(([data, error]) => {
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }

        if (data.length < 10) {
          setIsMore(false);
        }

        if (data.length) {
          setMemes((prevMemes) => [...prevMemes, ...data]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const updateMemes = () => {
    setMemes([]);
    setIsMore(true);
    setPage(1);
    uploadMemes(1);
  };

  const uploadMoreMemes = () => {
    if (isMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    uploadMemes(page,sortBy);
  }, [page,sortBy]);

  return { memes, isLoading, uploadMoreMemes, updateMemes };
};

export default useMemes;