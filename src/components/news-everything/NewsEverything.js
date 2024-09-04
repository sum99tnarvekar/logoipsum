import Article from "../Article";
import config from '../../config';
import {useParams} from "react-router-dom";
import Loader from '../../assets/loader.gif'
import {ModeCounter} from "../../context/ModeCounter";
import React, {useContext, useEffect, useReducer} from 'react';

export default function NewsEverything() {
    let APIUrl = null;
    const pageSize = 9
    const { topic } = useParams();
    const value = useContext(ModeCounter);
    const [articles, setArticles] = React.useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = React.useState(true);
    const [totalPages , setTotalPages] = React.useState(0);

    const reducer = (state , action) =>{
        if(action.type === "prev"){
            return state - 1;
        }
        if(action.type === "next"){
            return state + 1;
        }
    }

    const [page , dispatch] = useReducer(reducer , 1);

    if (topic === "bitcoin") APIUrl = `${config.API_URL}q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=${process.env.REACT_APP_NEWS_APP_API_KEY}`;
    else if(topic === "apple") APIUrl = `${config.API_URL}q=${topic}&from=${today}&to=${today}&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_APP_API_KEY}`;
    else APIUrl = `${config.API_URL}domains=${topic}.com,thenextweb.com&apiKey=${process.env.REACT_APP_NEWS_APP_API_KEY}`


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
            }catch (err){
                console.error(err);
            }finally {
                setLoading(false)
            }
        }
        fetchNewsData();
    } , [page , APIUrl]);


    return (
        <section className={`${value.mode ? "bg-white" : "bg-gray-900"}`}>
            {loading && (
                <div className="flex justify-center">
                    <img src={Loader} alt="Loading..." /> {/* Adjust path as needed */}
                </div>
            )}
            {!loading && (
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:py-8">

                <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">

                    {
                        articles.map((article , index) => (
                            <Article article={ article } key={ index } />
                        ))
                    }

                </div>
            </div>
                )}

            <div className="flex items-center gap-4 justify-center p-8">
                <div className="sm:flex sm:gap-4">
                    <button disabled={page === 0} onClick={() => dispatch({type: "prev"})} className={`${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow`}>
                        Prev
                    </button>
                </div>
                    <div className="hidden sm:flex">
                        <button disabled={page === totalPages} onClick={() => dispatch({type: "next"})} className={`${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''} rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600`}>
                            Next
                        </button>
                    </div>
                </div>
        </section>
)
}
