import React from "react";

const Stepper = ({ step }) => {
    const colorStyle = (num) => {
        if (num < step) {
            return "bg-green-500";
        }
        if (num == step) {
            return "bg-yellow-200";
        }
        if (num > step) {
            return "bg-gray-100";
        }
    };

    return (
        <div className="w-[28rem]">
            <ul className="flex justify-between duration-200 ease-in-out">
                <li className="flex-auto">
                    <div className="flex cursor-pointer items-center pl-2 after:ml-2 after:h-px after:w-full after:flex-1 after:bg-gray-400 after:content-[''] hover:bg-black/5">
                        <span
                            className={`${colorStyle(
                                1
                            )} font-medium my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full text-sm text-gray-700`}
                        >
                            1
                        </span>
                        <span className="font-medium text-gray-700 after:flex after:text-[0.8rem]">
                            step1
                        </span>
                    </div>
                </li>
                <li className="flex-auto">
                    <div className="flex cursor-pointer items-center before:mr-2 before:h-px before:w-full before:flex-1 before:bg-gray-400 before:content-[''] after:ml-2 after:h-px after:w-full after:flex-1 after:bg-gray-400 after:content-[''] hover:bg-black/5">
                        <span
                            className={`${colorStyle(
                                2
                            )} font-medium my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full text-sm text-gray-500`}
                        >
                            2
                        </span>
                        <span className="font-medium text-gray-700 after:flex after:text-[0.8rem]">
                            step2
                        </span>
                    </div>
                </li>
                <li className="flex-auto">
                    <div className="flex cursor-pointer items-center pr-2 before:mr-2 before:h-px before:w-full before:flex-1 before:bg-gray-400 before:content-[''] hover:bg-black/5">
                        <span
                            className={`${colorStyle(
                                3
                            )} font-medium my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full text-sm text-gray-500`}
                        >
                            3
                        </span>
                        <span className="font-medium text-gray-700 after:flex after:text-[0.8rem]">
                            step3
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Stepper;
