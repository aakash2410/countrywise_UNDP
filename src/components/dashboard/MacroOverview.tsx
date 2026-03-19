'use client';

import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { radarData } from './MockData';
import { Globe, Info, Scale, ShieldAlert, Lightbulb, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MacroOverview() {
    const [visibleCountries, setVisibleCountries] = useState({
        Malaysia: true,
        Cambodia: true,
        Philippines: true,
        Bangladesh: true,
        Nepal: true,
    });

    const toggleCountry = (country: keyof typeof visibleCountries) => {
        setVisibleCountries(prev => ({
            ...prev,
            [country]: !prev[country]
        }));
    };

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

            {/* Radar Chart Section */}
            <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-14">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            Regional Ecosystem Comparison
                            <button
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                                aria-label="Learn more about this chart"
                                title="This chart compares countries across 6 core parameters. Higher values indicate higher maturity."
                            >
                                <Info className="w-5 h-5" />
                            </button>
                        </h2>
                        <p className="text-slate-500 mt-1 mb-4">Multi-dimensional assessment of digital readiness parameters.</p>
                        <Link
                            href="/scoring"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <Info className="w-4 h-4" />
                            Methodology
                            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                        </Link>
                    </div>

                    {/* Legend / Toggles */}
                    <div className="flex flex-wrap gap-3" role="group" aria-label="Toggle countries">
                        {(Object.keys(visibleCountries) as Array<keyof typeof visibleCountries>).map((country) => {
                            const isActive = visibleCountries[country];
                            const getBgColor = (c: string) => {
                                if (c === 'Malaysia') return isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200';
                                if (c === 'Cambodia') return isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200';
                                if (c === 'Philippines') return isActive ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200';
                                if (c === 'Bangladesh') return isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200';
                                if (c === 'Nepal') return isActive ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200';
                                return '';
                            };

                            const getBorderColor = (c: string) => {
                                if (c === 'Malaysia') return isActive ? 'border-blue-600' : 'border-slate-200';
                                if (c === 'Cambodia') return isActive ? 'border-emerald-600' : 'border-slate-200';
                                if (c === 'Philippines') return isActive ? 'border-amber-500' : 'border-slate-200';
                                if (c === 'Bangladesh') return isActive ? 'border-indigo-600' : 'border-slate-200';
                                if (c === 'Nepal') return isActive ? 'border-purple-600' : 'border-slate-200';
                                return '';
                            };

                            return (
                                <button
                                    key={country}
                                    onClick={() => toggleCountry(country)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${getBgColor(country)} ${getBorderColor(country)}`}
                                    aria-pressed={isActive}
                                >
                                    {country}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Chart Container */}
                <div className="w-full h-[500px]" aria-label="Radar chart showing country data">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis
                                dataKey="parameter"
                                tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }}
                            />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 5]}
                                tick={{ fill: '#94a3b8' }}
                                tickCount={6}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ fontWeight: 600 }}
                            />

                            {visibleCountries.Malaysia && (
                                <Radar
                                    name="Malaysia"
                                    dataKey="Malaysia"
                                    stroke="#2563eb"
                                    fill="#2563eb"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                />
                            )}
                            {visibleCountries.Cambodia && (
                                <Radar
                                    name="Cambodia"
                                    dataKey="Cambodia"
                                    stroke="#059669"
                                    fill="#059669"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                />
                            )}
                            {visibleCountries.Philippines && (
                                <Radar
                                    name="Philippines"
                                    dataKey="Philippines"
                                    stroke="#f59e0b"
                                    fill="#f59e0b"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                />
                            )}
                            {visibleCountries.Bangladesh && (
                                <Radar
                                    name="Bangladesh"
                                    dataKey="Bangladesh"
                                    stroke="#4f46e5"
                                    fill="#4f46e5"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                />
                            )}
                            {visibleCountries.Nepal && (
                                <Radar
                                    name="Nepal"
                                    dataKey="Nepal"
                                    stroke="#9333ea"
                                    fill="#9333ea"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                />
                            )}
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Radar Chart Legend */}
                <div className="mt-6 flex flex-col items-center justify-center text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-700 mb-2">Scoring Scale (1 to 5)</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 shadow-sm"></span> 1: Greenfield</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400 shadow-sm"></span> 2: Open to Adopt</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm"></span> 3: Early Success</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm"></span> 4: Maturing</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></span> 5: Role Model</span>
                    </div>
                    <p className="text-xs italic mt-1 text-slate-400 text-center">Note: The specific qualitative interpretation of these stages varies for each parameter. See Methodology.</p>
                </div>

                {/* Regional Synthesis 
                <div className="mt-16 pt-12 border-t border-slate-100 relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-8 gap-2">
                        <h3 className="text-2xl font-bold tracking-tight">Regional Synthesis</h3>
                        <span className="text-sm text-slate-500 italic bg-white px-3 py-1 rounded-full border border-slate-200">
                            Source: UNDP Digital Transformation Scoping Report
                        </span>
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <Scale className="w-8 h-8 text-blue-600 mb-4" />
                            <h4 className="font-bold text-slate-900 mb-2">Siloed AI Policymaking</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                The absence of dedicated coordinating mechanisms weakens policy coherence and inflates operational costs. While the Philippines explores an inter-agency AI lead and Malaysia empowers NAIO, nations like Bangladesh face heavily fragmented and isolated data architectures.
                            </p>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <ShieldAlert className="w-8 h-8 text-amber-500 mb-4" />
                            <h4 className="font-bold text-slate-900 mb-2">Connectivity & R&D Gaps</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                While internet penetration scales rapidly, deficits in compute-capable infrastructure limit innovation. Cambodia relies heavily on ADB loans, whereas Bangladesh advocates for "Phygital" public infrastructure to bridge severe urban/rural divides alongside structural connectivity challenges.
                            </p>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <Lightbulb className="w-8 h-8 text-emerald-600 mb-4" />
                            <h4 className="font-bold text-slate-900 mb-2">Public Trust & Coordination</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Emerging concerns surrounding deepfakes and labor disruption demand robust data governance. The 2023 National ID breach in Bangladesh involving 50M records underscores the critical need for cyber-literacy, mirroring the governance frameworks actively being drafted in Cambodia and Malaysia.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
                */}
            </section>



            {/* Country Profile Links */}
            <section className="max-w-6xl mx-auto mt-12 mb-16" aria-label="Country detailing profiles">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Explore Country Profiles</h3>
                    <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                        Dive deeper into specific nations to view comprehensive ecosystem assessments, granular infrastructure metrics, primary implementation actors, and contextual strategic insights.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {['malaysia', 'cambodia', 'philippines', 'bangladesh', 'nepal'].map((c) => (
                        <Link key={c} href={`/countries/${c}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-800 font-semibold rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow transition-all group">
                            <span className="capitalize">{c}</span>
                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
