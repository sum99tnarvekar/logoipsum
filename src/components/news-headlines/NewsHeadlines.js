import config from '../../config';
import CountryModal from "../CountryModal";
import Loader from '../../assets/loader.gif'
import { useNavigate } from 'react-router-dom';
import {ModeCounter} from "../../context/ModeCounter";
import React, {useContext, useEffect, useReducer} from "react";


export default function NewsHeadlines() {
    const pageSize = 3;
    const navigate = useNavigate();
    const value = useContext(ModeCounter);
    const [articles, setArticles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [totalPages , setTotalPages] = React.useState(0);
    const [countryModal , showCountryModal] = React.useState(true);
    const [selectedCountry, setSelectedCountry] = React.useState("ae");

    const reducer = (state , action) =>{
        if(action.type === "prev"){
            return state - 1;
        }
        if (action.type === "next"){
            return state + 1;
        }
    }

    const [page , dispatch] = useReducer(reducer , 1);
    const APIUrl = `${config.API_HEADLINES_URL}country=${selectedCountry}&pageSize=${pageSize}&page=${page}&apiKey=${process.env.REACT_APP_NEWS_APP_API_KEY}`;

    const handleCloseModal = (countryCodeValue) => {
            if (countryCodeValue) {
                console.log(countryCodeValue);
                setSelectedCountry(countryCodeValue);
                showCountryModal(false);
            }else {
                console.log("no value")
                showCountryModal(false);
                navigate('/');
            }
        }

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch(APIUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotalPages(Math.ceil(data.totalResults / pageSize));
                setArticles(data.articles);

            }catch (e) {
                console.error(e);
            }finally {
                setLoading(false)
            }
        }
        fetchNewsData();
    }, [page , APIUrl]);


    return (
        <section className={`${value.mode ? "bg-white" : "bg-gray-900"}`}>
            {!countryModal && !loading && (
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header className="text-center">
                        <h2 className={`text-xl font-bold sm:text-3xl ${value.mode ? "text-gray-900" : "text-white"}`}>Top
                            Headlines</h2>

                        <p className="mx-auto mt-4 max-w-md text-gray-400">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
                            dicta incidunt est ipsam, officia dolor fugit natus?
                        </p>
                    </header>

                    <div className=" w-full mt-8">
                        <div className="flex flex-wrap w-full sm:w-full">
                            <div className="mb-4 sm:w-3/5 w-full" style={{height: '50%', marginRight: '1%'}}>
                                <a href="#" className="group relative block">
                                    <div className="relative">
                                        <img height="30px"
                                             src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                             alt=""
                                             className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    </div>

                                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                        <p className="text-white p-4 rounded-lg text-sm leading-snug shadow-md">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                            tempor
                                            incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <h3 className="mt-16 text-xl font-medium text-white">{articles[0].author}</h3>
                                        <span
                                            className="mt-1.5 inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-black">
                    Read More
                </span>
                                    </div>
                                </a>
                            </div>
                            <div className="mb-4 w-38 sm:w-full" style={{marginLeft: '1%'}}>

                                <div className={` mb-4 flex justify-center gap-4 bg-opacity-20 border rounded-lg backdrop-blur-sm ${value.mode ? 'bg-teal-600 border-teal-600' : 'bg-white border-white'}`}>
                                    <div className="" style={{padding: '10px 0'}}>
                                        <button disabled={page === 1} onClick={() => dispatch({type: "prev"})}
                                                className={`${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow`}>
                                            Prev
                                        </button>
                                    </div>
                                    <div className="" style={{padding: '10px 0'}}>
                                        <button disabled={page === totalPages} onClick={() => dispatch({type: "next"})}
                                                className={`${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''} rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600`}>
                                            Next
                                        </button>
                                    </div>
                                </div>

                                <div className=" mb-4">
                                    <a href="#" className="group relative block">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                                                alt=""
                                                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                        </div>

                                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                            <p className="text-white p-4 rounded-lg text-sm leading-snug shadow-md max-w-xs">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                                tempor
                                                incididunt ut labore et dolore magna aliqua.
                                            </p>
                                            <h3 className="mt-16 text-xl font-semibold text-white">{articles[1].author}</h3>
                                            <span
                                                className="mt-2 inline-block bg-white px-5 py-2 text-xs font-medium uppercase tracking-wide text-black">
                    Read More
                </span>
                                        </div>
                                    </a>
                                </div>

                                <div className=" mb-4">
                                    <a href="#" className="group relative block">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                                alt=""
                                                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                        </div>

                                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                            <p className="text-white p-4 rounded-lg text-sm leading-snug shadow-md max-w-xs">
                                                Additional content to fill the space. You can customize this as needed.
                                            </p>
                                            <h3 className="mt-16 text-xl font-medium text-white">{articles[2].author}</h3>
                                            <span
                                                className="mt-1.5 inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-black">
                    Read More
                </span>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>
            )}

            {
                countryModal && (
                    <CountryModal closeModal={() => handleCloseModal(null)} onSelect={handleCloseModal}/>
                )
            }

        </section>
    )
}