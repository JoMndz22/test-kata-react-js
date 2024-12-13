import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

import { AlbumData } from "./Home";
import Loading from "../components/Loading";
import InfoModalAlbum from "../components/InfoModalAlbum";
import AlbumCard from "../components/Card";

const AlbumPage = () => {
  const { id } = useParams();

  const [albumSelected, setAlbumSelected] = useState<AlbumData | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const getDetailsAlbum = async () => {
    try {
      const getData = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${id}/photos`
      );
      setAlbumData(getData.data);
      setLoading(false);
    } catch (error: unknown) {
      setError(JSON.stringify(error));
      setLoading(false);
    }
  };

  const filterMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filterAlbums = albumData.filter((album: AlbumData) =>
    album.title.includes(searchText)
  );

  const onViewDetails = (album: AlbumData) => {
    setAlbumSelected(album);
  };

  const closeModal = () => {
    setAlbumSelected(null);
  };

  useEffect(() => {
    getDetailsAlbum();
  }, []);

  useEffect(() => {
    console.log(albumSelected);
    if (albumSelected) {
      setVisibleModal(true);
      return;
    }
    setVisibleModal(false);
  }, [albumSelected]);

  return (
    <div className="">
      <h1 className="text-center uppercase p-5 font-bold text-3xl">
        - Album Details - {localStorage.getItem("title")}
      </h1>
      <hr />
      <h4 className="text-gray-400 text-center mb-5 mt-2 uppercase font-semibold">
        {localStorage.getItem("title")}
      </h4>
      <div className="container mx-auto">
        <input
          type="text"
          className="mb-3 rounded-md bg-slate-100 w-full h-[40px] p-2 border-[1px] border-gray-400 m-2"
          placeholder="Search..."
          onChange={(e) => filterMap(e)}
        />
        <div className="flex flex-wrap">
          {error && <p className="text-red-700">{error}</p>}
          {loading ? (
            <Loading />
          ) : (
            filterAlbums.map((album: AlbumData) => {
              const { id, title, thumbnailUrl, albumId, url } = album;
              return (
                <AlbumCard
                  key={id}
                  id={id}
                  title={title}
                  thumbnailUrl={thumbnailUrl}
                  albumId={albumId}
                  url={url}
                  setDataDetails={onViewDetails}
                />
              );
            })
          )}
        </div>
      </div>

      <InfoModalAlbum
        visible={visibleModal}
        albumSelected={albumSelected}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AlbumPage;
