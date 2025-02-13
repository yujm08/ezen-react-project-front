import { useParams } from "react-router-dom";
import ReadComponent from "../../components/Products/ReadComponent";

const ReadPage = () => {
    const { pno } = useParams();

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Product Read Page
            </div>
            <ReadComponent pno={pno}></ReadComponent>
        </div>
    );
};

export default ReadPage;