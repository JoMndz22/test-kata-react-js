import { AlbumData } from "../Home/Home";
import Loading from "../../components/Loading";
import InfoModalAlbum from "../../components/InfoModalAlbum";
import AlbumCard from "../../components/Card";
import useAlbumHook from "./useAlbumHooks";

const AlbumPage = () => {
  const {
    error,
    loading,
    filterMap,
    filterAlbums,
    onViewDetails,
    visibleModal,
    albumSelected,
    closeModal,
    onAddFavorite,
  } = useAlbumHook();

  return (
    <div className="">
      <h1 className="text-center uppercase p-5 font-bold text-3xl">
        - Album Details -
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
              const { id, title, thumbnailUrl, albumId, url, favorite } = album;
              return (
                <AlbumCard
                  key={id}
                  id={id}
                  title={title}
                  thumbnailUrl={thumbnailUrl}
                  albumId={albumId}
                  url={url}
                  favorite={favorite}
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
        onAddFavorite={onAddFavorite}
      />
    </div>
  );
};

export default AlbumPage;
