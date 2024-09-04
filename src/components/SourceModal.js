import React from 'react';

export default function SourceModal({closeModal , onSelect }) {
    const [sourceCode , setsourceCode] = React.useState("");
    const handleChange = (e) => {
        setsourceCode(e.target.value);
    }

    const handleSubmit = () => {
        if (onSelect) {
            onSelect(sourceCode);
        }
    };
    return (
        <div id="default-modal" tabIndex="-1" aria-hidden="true"
             className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Select Source
                        </h3>
                        <button type="button" onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Please select a specific type of source from the list below. The available options cover sources from
                            various continents, allowing you to choose the one most relevant to your needs. If you have
                            any specific requirements or need further assistance, feel free to reach out to our support
                            team.
                        </p>
                        <div>
                            <select id="country-select" name="country" style={{border: 'none'}} value={sourceCode}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 text-sm rounded-lg  bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <option value="">Select a source</option>
                                {[
                                    "business", "entertainment", "general", "health", "science", "sports", "technology"
                                ].map((code) => (
                                    <option key={code} value={code.toLowerCase()}>{code.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div
                        className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="default-modal" type="button"
                                onClick={sourceCode !== "" ? handleSubmit : undefined}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {sourceCode === "" ? "Select" : "Thrive"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}