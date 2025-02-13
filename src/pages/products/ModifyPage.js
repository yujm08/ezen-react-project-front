import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/Products/ModifyComponent";

const ModifyPage = () => {

    const {pno} = useParams()

    return(
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Product Modify Page
            </div>
            <ModifyComponent pno={pno}></ModifyComponent>
        </div>
    )
}

export default ModifyPage;