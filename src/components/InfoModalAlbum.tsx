import { AlbumData } from "../pages/Home";

interface PropsModal {
  visible: boolean;
  albumSelected: AlbumData | null;
  closeModal: () => void;
}

const InfoModalAlbum = ({ visible, albumSelected, closeModal }: PropsModal) => {
  if (visible && albumSelected) {
    const { title, url } = albumSelected;
    return (
      <div className="bg-[#4b5563c9] h-full max-h-full w-h-full max-w-full fixed left-0 top-0 right-0 justify-center z-20 items-center">
        <div className="bg-white rounded-lg w-[90%] md:w-[700px] mx-auto relative pt-12 max-h-[90%] mt-[2%]">
          <button
            className="absolute top-2 right-3 p-5 bg-gray-100 h-[25px] w-[25px] flex items-center justify-center rounded-md"
            onClick={closeModal}
          >
            X
          </button>
          <div className="w-full bg-slate-100 rounded-md">
            <img
              src={`${url}`}
              className="block w-full p-2 mx-auto mt-1"
              alt={title}
            />
            <p className="text-center uppercase pb-3"> {title}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default InfoModalAlbum;
