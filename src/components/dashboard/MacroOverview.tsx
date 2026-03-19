'use client';

import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const countryCards = [
    {
        id: 'malaysia',
        name: 'Malaysia',
        color: 'blue',
        bgSubtle: 'bg-blue-50',
        textAccent: 'text-blue-600',
        bgDot: 'bg-blue-500',
        hoverBorder: 'hover:border-blue-400',
        hoverBg: 'hover:bg-blue-600',
        hoverText: 'hover:text-white',
        gradientSubtle: 'from-blue-50',
        description: 'Advanced AI & DPI maturity with strong funding and hyperscale investments.',
        highlights: ['Internet Penetration: 97.7%', 'Electricity Access: 100%', 'AI Readiness: Maturing']
    },
    {
        id: 'cambodia',
        name: 'Cambodia',
        color: 'emerald',
        bgSubtle: 'bg-emerald-50',
        textAccent: 'text-emerald-600',
        bgDot: 'bg-emerald-500',
        hoverBorder: 'hover:border-emerald-400',
        hoverBg: 'hover:bg-emerald-600',
        hoverText: 'hover:text-white',
        gradientSubtle: 'from-emerald-50',
        description: 'Rapid DPI growth via sovereign blockchain systems and draft AI frameworks.',
        highlights: ['Internet Penetration: 60%', 'Electricity Access: 92.3%', 'AI Readiness: Open to Adopt']
    },
    {
        id: 'philippines',
        name: 'Philippines',
        color: 'amber',
        bgSubtle: 'bg-amber-50',
        textAccent: 'text-amber-600',
        bgDot: 'bg-amber-500',
        hoverBorder: 'hover:border-amber-400',
        hoverBg: 'hover:bg-amber-600',
        hoverText: 'hover:text-white',
        gradientSubtle: 'from-amber-50',
        description: 'Strong DPI adoption (PhilSys & payments) with emerging AI research initiatives.',
        highlights: ['Internet Penetration: 83.8%', 'Electricity Access: 89%', 'AI Readiness: Early Success']
    },
    {
        id: 'bangladesh',
        name: 'Bangladesh',
        color: 'indigo',
        bgSubtle: 'bg-indigo-50',
        textAccent: 'text-indigo-600',
        bgDot: 'bg-indigo-500',
        hoverBorder: 'hover:border-indigo-400',
        hoverBg: 'hover:bg-indigo-600',
        hoverText: 'hover:text-white',
        gradientSubtle: 'from-indigo-50',
        description: 'Vast digital payments network with draft AI policies for comprehensive growth.',
        highlights: ['Internet Penetration: 40%+', 'Electricity Access: 100%', 'AI Readiness: Open to Adopt']
    },
    {
        id: 'nepal',
        name: 'Nepal',
        color: 'purple',
        bgSubtle: 'bg-purple-50',
        textAccent: 'text-purple-600',
        bgDot: 'bg-purple-500',
        hoverBorder: 'hover:border-purple-400',
        hoverBg: 'hover:bg-purple-600',
        hoverText: 'hover:text-white',
        gradientSubtle: 'from-purple-50',
        description: 'Expanding digital inclusion and infrastructure resilience in South Asia.',
        highlights: ['Internet Penetration: Growing', 'Electricity Access: 90%+', 'AI Readiness: Greenfield/Early']
    }
];

export default function MacroOverview() {

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-16 font-sans text-slate-900">

            {/* Hero Section */}
            <header className="mb-16 max-w-5xl mx-auto text-center">
                <div className="flex flex-wrap items-center justify-center mb-10 pt-4 opacity-90">
                    {/* <div className="flex items-center justify-center border-r border-slate-300 pr-6 md:pr-10">
                        <img src="/undp-logo.png" alt="UNDP Logo" className="h-20 md:h-25 w-auto object-contain" />
                    </div>
                    <div className="border-r border-slate-300 px-6 md:px-10 flex items-center justify-center">
                        <img src="/artha-logo.png" alt="Artha Global Logo" className="h-10 md:h-14 w-auto object-contain" />
                    </div>
                    <div className="pl-6 md:pl-10 flex items-center justify-center">
                        <img src="/kalpa-logo.png" alt="Kalpa Impact Logo" className="h-10 md:h-14 w-auto object-contain" />
                    </div>*/}

                </div>
                <div className="inline-flex items-center justify-center space-x-2 bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-base font-semibold mb-8">
                    <Globe className="w-5 h-5" />
                    <span>UNDP Digital Transformation Support</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight" aria-label="Digital Transformation Readiness in Asia Pacific">
                    Digital Transformation Readiness<br />
                    <span className="text-blue-600">Asia-Pacific Countries</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-loose">
                    Interactive dashboard assessing the foundational digital public infrastructure (DPI), artificial intelligence (AI) ecosystem maturity, and political landscapes across countries in the Asia-Pacific region.
                </p>
            </header>

            {/* Country Profile Links */}
            <section className="max-w-6xl mx-auto mt-12 mb-24 p-4" aria-label="Country detailing profiles">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Explore Country Profiles</h2>
                    <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-lg">
                        Dive deeper into specific nations to view comprehensive ecosystem assessments, granular infrastructure metrics, and strategic insights.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {countryCards.map((country) => (
                        <motion.div
                            key={country.id}
                            whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                            transition={{ duration: 0.3 }}
                            className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${country.hoverBorder}`}
                        >
                            <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${country.gradientSubtle} to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className={`p-3.5 rounded-2xl ${country.bgSubtle} ${country.textAccent} group-hover:scale-110 transition-transform duration-300`}>
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 capitalize tracking-tight">{country.name}</h3>
                                </div>
                                
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                    {country.description}
                                </p>
                                
                                <div className="space-y-2.5 mb-8">
                                    {country.highlights.map((h, index) => (
                                        <div key={index} className="flex items-center gap-2.5 text-sm text-slate-500">
                                            <div className={`w-2 h-2 rounded-full ${country.bgDot} opacity-75`}></div>
                                            <span className="font-medium">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <Link href={`/countries/${country.id}`} className={`relative z-10 inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-slate-50 ${country.hoverBg} ${country.hoverText} text-slate-700 font-bold rounded-xl transition-all duration-300 group-hover:shadow-md mt-auto border border-slate-100 hover:border-transparent`}>
                                <span>View Profile</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
