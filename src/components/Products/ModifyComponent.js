import { useEffect, useRef, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import { deleteOne, getOne, putOne } from "../../api/productApi";
import FetchingModal from "../common/FetchingMadal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delflag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);

  const [fetching, setFetching] = useState(false);

  const {moveToList, moveToRead} = useCustomMove();

  const uploadRef = useRef();

  useEffect(() => {
    console.log("ModifyComponent에서의 pno: ", pno);
    setFetching(true);

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const deleteOldImages = (imageName) => {

    const resultFileNames = product.uploadFileNames.filter(filename => filename !== imageName)

    product.uploadFileNames = resultFileNames;

    setProduct({...product})
  }

  //수정 함수
  const handleClickModify = async () => {
    if (!pno) {
        console.error("Invalid pno");
        return;
    }
  
    const files = uploadRef.current.files;
    const formData = new FormData();
  
    // 새로운 파일이 있는 경우에만 추가
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }
  
        formData.append("pno", pno);
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price);
        formData.append("delflag", product.delflag);
  
        // 기존 이미지 목록이 있는 경우에만 추가
        if (product.uploadFileNames && product.uploadFileNames.length > 0) {
            product.uploadFileNames.forEach(fileName => {
                formData.append("uploadFileNames", fileName);
            });
        }
  
        try {
            await putOne(pno, formData);
            alert("수정이 완료되었습니다.");
           moveToRead(pno);
        } catch (error) {
            console.error("Error modifying product:", error);
            alert("수정에 실패했습니다.");
        }
    };
      
      //삭제 함수
      const handleClickDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
          return;
        }
      
        try {
          await deleteOne(pno);
          alert("삭제가 완료되었습니다.");
          moveToList(); // 삭제 후 리스트 페이지로 이동
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("삭제에 실패했습니다.");
        }
      };
      

  return(
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            {fetching ? <FetchingModal></FetchingModal> : <></>}

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
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="delflag" value={product.delflag} onChange={handleChangeProduct}
                    className="w-4/5 p-6 rounded-r border-solid border-neutral-300 shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
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

            <div className="flex justify-center">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">IMAGES</div>
                    {product.uploadFileNames.map( (imgFile, i) => 
                        <div className="w-4/5 justify-center flex flex-wrap w-1/3 m-1 align-baseline" key={i}>
                        <button className="bg-blue-500 text-3xl text-white"
                        onClick={() => deleteOldImages(imgFile)}>DELETE</button>
                        <img alt="img" src={`${host}/api/products/view/s_${imgFile}`}></img>
                    </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"  className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={handleClickDelete}>
                    DELETE
                </button>

                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500" 
                onClick={handleClickModify}>
                    MODIFY
                </button>

                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" 
                onClick={moveToList}>
                    LIST
                </button>
            </div>

        </div>
  )
};


export default ModifyComponent;
