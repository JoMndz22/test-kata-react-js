import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { AlbumData } from "../Home/Home";

const useAlbumHook = () => {
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
      const addFavoriteProp = getData.data.map((album: AlbumData) => ({
        ...album,
        favorite: false,
      }));
      setAlbumData(addFavoriteProp);
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

  const onAddFavorite = (id: number) => {
    setAlbumData((prevAlbums) =>
      prevAlbums.map((album) =>
        album.id === id ? { ...album, favorite: !album.favorite } : album
      )
    );
    if (albumSelected && albumSelected.id === id) {
      setAlbumSelected((prev) =>
        prev ? { ...prev, favorite: !prev.favorite } : prev
      );
    }
  };

  const closeModal = () => {
    setAlbumSelected(null);
  };

  useEffect(() => {
    getDetailsAlbum();
  }, [id]);

  useEffect(() => {
    if (albumSelected) {
      setVisibleModal(true);
      return;
    }
    setVisibleModal(false);
  }, [albumSelected]);

  return {
    error,
    loading,
    filterAlbums,
    visibleModal,
    albumSelected,

    closeModal,
    filterMap,
    onAddFavorite,
    onViewDetails,
  };
};

export default useAlbumHook;
