import { useEffect, useState } from "react";
import axios from "axios";

import Album from "../components/Album";
import Loading from "../components/Loading";

export interface AlbumsProps {
  userId: number;
  id: number;
  title: string;
}

export interface AlbumData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite?: boolean;
}

const Home = () => {
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

  return (
    <div>
      <h1 className="text-center uppercase p-5 font-bold text-3xl">
        - Albums -
      </h1>
      <hr />
      <h3 className="mt-4 text-gray-400 text-center mb-5">
        Select your favorite album
      </h3>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {error && <p className="text-red-700">{error}</p>}
          {loading ? (
            <Loading />
          ) : (
            albums?.map((item: AlbumsProps) => (
              <Album key={item.id} id={item.id} title={item.title} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
