import { useRef, useState } from "react";
import {postAdd} from "../../api/productApi"
import FetchingModal from "../common/FetchingMadal";
import useCustomMove from "../../hooks/useCustomMove"

const initState = {
    pname:'',
    pdesc:'',
    price:0,
    files:[]
}

const AddComponent = () => {

    const [product, setProduct] = useState({...initState})

    const uploadRef = useRef()

    const [fetching, setFetching] = useState(false)

    const [result, setResult] = useState(null);

    const {moveToList} = useCustomMove()

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = async (e) => {
        try {
            const files = uploadRef.current.files
            const formData = new FormData()
    
            for(let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
    
            formData.append("pname", product.pname)
            formData.append("pdesc", product.pdesc)
            formData.append("price", product.price)
    
            setFetching(true)
    
            const data = await postAdd(formData)
            setResult(data.result)
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setFetching(false)
        }
    }

    const closeModal = () => {
        setResult(null)
        moveToList({page:1})
    }

    return(
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            {fetching ? <FetchingModal/> : <></>}

            {result ? <FetchingModal
            title={'Product Add Result'}
            content={`${result}번 등록 완료`}
            callbackFn={closeModal}
            ></FetchingModal>:<></>}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border-solid border-neutral-300 shadow-md"
                        name="pname"
                        type={'text'}
                        value={product.pname}
                        onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border-solid border-neutral-300 shadow-md"
                        name="pdesc"
                        rows="4"
                        value={product.pdesc}
                        onChange={handleChangeProduct}>
                            {product.pdesc}
                    </textarea>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border-solid border-neutral-300 shadow-md"
                        name="price"
                        type={'number'}
                        value={product.price}
                        onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input className="w-4/5 p-6 rounded-r border-solid border-neutral-300 shadow-md"
                        ref={uploadRef}
                        type={'file'}
                        multiple={true}>
                    </input>
                </div>
            </div>

            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button
                        type="button"
                        onClick={handleClickAdd}
                        className="rounded-r p-4 w-36 bg-blue-500 text-xl text-white"
                    >
                        ADD
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AddComponent;