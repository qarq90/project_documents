import { FaTrashCan } from "react-icons/fa6";
import { decryptFileName } from "@/helpers/fetchHelpers";
import { deleteDoc } from "@/helpers/deleteHelpers";
import { useUIStore } from "@/stores/UIStore";

export const Row = ({
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

    const decryptedFileName = decryptFileName(file_name);

    const deleteHandler = async (event) => {
        setIsLoader(true);
        event.preventDefault();
        const key = file_link.split("/").pop();

        const result = await deleteDoc(_id, key);

        if (result.status) {
            const updatedDocs =
                documents?.filter((doc) => doc._id !== _id) || [];
            setDocuments(updatedDocs);
        }

        setIsLoader(false);
    };

    return (
        <a
            href={file_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-4 rounded-md bg-[var(--secondary-black)] px-6 py-2 text-left hover:brightness-125"
        >
            <div className="w-24">{index + 1}</div>
            <div className="w-96">{decryptedFileName}</div>
            <div className="w-72">{file_type}</div>
            <div className="w-64">
                {new Date(created_at).toLocaleDateString("en-US")}
            </div>
            <div onClick={deleteHandler} className="ml-auto flex-shrink-0">
                <FaTrashCan />
            </div>
        </a>
    );
};
