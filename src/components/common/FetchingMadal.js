const FetchingModal = ({title, content, callbackFn}) => {
    return(
        <div className={`fixed top-0 left-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black bg-opacity-20`}>
            <div className="bg-white rounded-3xl opacity-100 min-w-min h-1/4 min-w-[600px] flex flex-col justify-center items-center">
                <div className="text-4xl font-extrabold text-orange-400 m-10">
                    {title || 'Loading......'}
                </div>
                {content ? 
                    <div className="text-2xl font-bold text-gray-600 mb-4">
                        {content}
                    </div> : <></>
                }
                {callbackFn ? 
                    <button 
                        onClick={callbackFn}
                        className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        확인
                    </button> : <></>
                }
            </div>
        </div>
    )
}

export default FetchingModal;