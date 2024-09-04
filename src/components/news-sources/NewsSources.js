import Source from "../Source";
import config from "../../config";
import SourceModal from "../SourceModal";
import {useNavigate} from "react-router-dom";
import {ModeCounter} from "../../context/ModeCounter";
import React, {useContext, useEffect, useReducer} from 'react';


export default function NewsSources() {
    const pageSize = 6;
    const navigate = useNavigate();
    const value = useContext(ModeCounter);
    const [sources, setSources] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [totalPages , setTotalPages] = React.useState(0);
    const [sourceModal , showSourceModal] = React.useState(true);
    const [selectedSource, setselectedSource] = React.useState("general");

    const reducer = (state , action) =>{
        if(action.type === "prev"){
            return state - 1;
        }
        if (action.type === "next"){
            return state + 1;
        }
    }

    const [page , dispatch] = useReducer(reducer , 1);
    const APIUrl = `${config.API_SOURCES_URL}category=${selectedSource}&pageSize=${pageSize}&page=${page}&apiKey=${process.env.REACT_APP_NEWS_APP_API_KEY}`;

    const handleCloseModal = (sourceCodeValue) => {
        if (sourceCodeValue) {
            setselectedSource(sourceCodeValue);
            showSourceModal(false);
        }else {
            showSourceModal(false);
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
                setTotalPages(Math.ceil(data.sources.length / pageSize));
                setSources(data.sources);

            }catch (e) {
                console.error(e);
            }finally {
                setLoading(false)
            }
        }
        fetchNewsData();
    }, [page , APIUrl]);

    console.log(APIUrl)

   return (
       <section className={`${value.mode ? "bg-white" : "bg-gray-900"}`}>
           {!sourceModal && !loading && (
           <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
               <div className="max-w-xl">
                   <h2 className={`${value.mode ? 'text-black' : 'text-white'} text-3xl font-bold sm:text-4xl`}>Sources makes knowledge special</h2>

                   <p className={`${value.mode ? 'text-black' : 'text-gray-300'} mt-4 `}>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam
                       iste obcaecati. Consequatur ipsa quod ipsum sequi culpa delectus, cumque id tenetur
                       quibusdam, quos fuga minima.
                   </p>
               </div>

               <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                   {
                       sources.map((source , index) => (
                           <Source source={ source } key={ index } />
                       ))
                   }
               </div>
           </div>
           )}

           {
               sourceModal && (
                   <SourceModal closeModal={() => handleCloseModal(null)} onSelect={handleCloseModal}/>
               )
           }
       </section>
   )
}