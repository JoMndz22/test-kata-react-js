import { AlbumData } from "../pages/Home";

interface AlbumCardProps extends AlbumData {
  setDataDetails: (album: AlbumData) => void;
}

const AlbumCard = ({
  id,
  title,
  thumbnailUrl,
  albumId,
  url,
  setDataDetails,
}: AlbumCardProps) => {
  return (
    <div key={id} className="w-1/3 p-2 flex">
      <div className="bg-gray-200 p-2 rounded-md flex flex-col h-full w-full">
        <img
          src={thumbnailUrl}
          className="rounded-md mx-auto mb-2"
          alt={title}
        />
        <h4 className="text-center font-semibold flex-grow">{title}</h4>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() =>
            setDataDetails({
              id,
              title,
              thumbnailUrl,
              albumId,
              url,
            })
          }
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
