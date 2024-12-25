import { FaTrashCan } from "react-icons/fa6";
import { deleteDoc } from "@/helpers/deleteHelpers";
import { useUIStore } from "@/stores/UIStore";
import CryptoJS from "crypto-js";

export const Card = ({
  index,
  file_name,
  file_type,
  created_at,
  file_link,
  _id,
  documents,
  setDocuments,
}) => {
  const { setIsLoader } = useUIStore();

  const deleteHandler = async (event) => {
    setIsLoader(true);
    event.preventDefault();
    const key = file_link.split("/").pop();

    const result = await deleteDoc(_id, key);

    if (result.status) {
      const updatedDocs = documents?.filter((doc) => doc._id !== _id) || [];
      setDocuments(updatedDocs);
    }

    setIsLoader(false);
  };

  const bytes = CryptoJS.AES.decrypt(
    file_name,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  );
  const decryptedFileName = bytes.toString(CryptoJS.enc.Utf8);

  return (
    <div
      key={index}
      className="group relative flex h-full flex-col justify-between rounded-md bg-[var(--secondary-black)] p-4 shadow-md transition-all hover:brightness-125"
    >
      <a
        href={file_link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-col gap-2"
      >
        <div className="flex-1">
          <strong>Name:</strong>
          <br />
          {decryptedFileName}
        </div>
        <div className="flex-1">
          <strong>Type:</strong> {file_type}
        </div>
        <div className="flex-1">
          <strong>Uploaded:</strong>{" "}
          {new Date(created_at).toLocaleDateString("en-US")}
        </div>
      </a>
      <button
        onClick={deleteHandler}
        className="absolute bottom-4 right-4 rounded-md bg-red-500 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:outline-none hover:bg-red-600"
      >
        <FaTrashCan />
      </button>
    </div>
  );
};
