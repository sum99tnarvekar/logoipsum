import React, {useContext} from 'react';
import {ModeCounter} from "../context/ModeCounter";
import useSvgSelector from "../customhook/SvgSelector";

export default function Source({source , key}) {
    const value = useContext(ModeCounter);
    const SvgComponent = useSvgSelector(source.category);
    return (
        <div key={key} className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-gray-200 text-teal-400 p-4">
          {SvgComponent}
        </span>

            <div>
                <h2 className={`text-lg font-bold value ${value.mode ? 'text-black' : 'text-white'}`}>{source.name}</h2>

                <p className={`mt-1 text-sm ${value.mode ? 'text-black' : 'text-gray-300' } `}>{source.description}
                </p>
            </div>
        </div>
    )
}