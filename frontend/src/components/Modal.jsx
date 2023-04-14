import React, { useState } from "react";

function Modal({ button_name, Component }) {
    const [showModal, setShowModal] = useState(false);

    const handler = (e) => {
        if (e.target.id === "modal") {
            document.body.style.overflowY = "auto";
            setShowModal(false);
        }
    };

    return (
        <>
            <button
                className="text-gray-700 px-4 py-2 text-sm"
                onClick={() => {
                    setShowModal(true);
                    document.body.style.overflowY = "hidden";
                }}
            >
                {button_name}
            </button>
            {showModal ? (
                <div
                    id="modal"
                    className="cursor-default fixed inset-0 flex justify-center items-center bg-black/40"
                    onClick={handler}
                >
                    <div className="relative bg-white rounded-lg flex flex-col min-w-[20rem]">
                        <button
                            className="absolute z-50 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            onClick={() => setShowModal(false)}
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                            </svg>
                        </button>
                        <div className="p-3">
                            {<Component setShowModal={setShowModal} />}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Modal;
