import { useEffect, useState } from "react";
import axios from "axios";
import { AlbumsProps } from "./Home";

const useHomeHook = () => {
  const [albums, setAlbums] = useState<AlbumsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const req = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbums(req.data);
      setLoading(false);
    } catch (error) {
      setError(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    albums,
    loading,
    error,
  };
};

export default useHomeHook;
