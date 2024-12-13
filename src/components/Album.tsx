import { useNavigate } from "react-router-dom";

interface AlbumItem {
  title: string;
  id: number;
}

const Album = ({ title, id }: AlbumItem) => {
  const navigate = useNavigate();

  const goToAlbumById = (id: number) => {
    localStorage.setItem("title", title);
    navigate(`/album/${id}`);
  };

  return (
    <div className="w-1/4 p-1">
      <button
        onClick={() => goToAlbumById(id)}
        className="border-[1px] border-gray-300 rounded-md p-2 hover:bg-slate-400 hover:cursor-pointer w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out"
      >
        <p>{title}</p>
      </button>
    </div>
  );
};

export default Album;
