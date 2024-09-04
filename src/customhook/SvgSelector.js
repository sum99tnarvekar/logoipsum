import React from 'react';

const svgIcons = [
    {
        category: 'business',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M3 12h18M3 18h18M3 6v12m0 0h18M21 6v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    },
    {
        category: 'entertainment',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3l14 9-14 9V3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    },
    {
        category: 'general',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4v16M4 12h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    },
    {
        category: 'health',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4v8m0 0v8m0-8h8m-8 0H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    },
    {
        category: 'science',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12l7-7 7 7-7 7-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                <path d="M12 13v9m0-9l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    },
    {
        category: 'sports',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2.59 7.91L22 12l-6.41 2.09L12 22l-3.59-7.91L2 12l6.41-2.09L12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    },
    {
        category: 'technology',
        svg: (
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7V3h4V1h8v2h4v4M4 7h16M4 17h16v4H4v-4zM4 7v10m0 0h16V7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </svg>
        )
    }
];

export default function useSvgSelector(category) {
    const icon = svgIcons.find(icon => icon.category === category);
    return icon ? icon.svg : null;
}
