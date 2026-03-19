'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, HelpCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { scoringCriteria } from '@/components/dashboard/NewScoringData';

export default function ScoringMethodologyPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl flex flex-col items-start mx-auto mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium hover:-translate-x-1 duration-200">
                    <ArrowLeft className="w-4 h-4" /> Back to Regional Dashboard
                </Link>
            </div>

            {/* Header */}
            <div className="max-w-[90rem] mx-auto mb-10 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="w-6 h-6 text-indigo-600" />
                    <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Methodology</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">How is scoring done?</h1>
                <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
                    The Radar Chart scores are derived by assessing granular, qualitative milestones across specific sub-parameters. Each sub-parameter is evaluated against progressive 1-to-5 maturity stage definitions (Greenfield through Role Model).
                </p>
            </div>

            {/* Matrix Table */}
            <div className="max-w-[90rem] mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                                <th className="p-4 md:p-6 font-bold text-slate-900 w-1/6">Parameter & Sub-Parameter</th>
                                <th className="p-4 md:p-6 font-semibold text-slate-700 w-[16.6%] border-l border-slate-100">
                                    <div className="flex items-center gap-2 relative group">
                                        <div className="w-3 h-3 rounded-full bg-slate-400"></div> Stage 1: Greenfield
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Score: 1</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-normal mt-1 ml-5">(No Activity)</div>
                                </th>
                                <th className="p-4 md:p-6 font-semibold text-slate-700 w-[16.6%] border-l border-slate-100">
                                    <div className="flex items-center gap-2 relative group">
                                        <div className="w-3 h-3 rounded-full bg-blue-300"></div> Stage 2: Open to Adopt
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Score: 2</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-normal mt-1 ml-5">(Intent / Planning)</div>
                                </th>
                                <th className="p-4 md:p-6 font-semibold text-slate-700 w-[16.6%] border-l border-slate-100">
                                    <div className="flex items-center gap-2 relative group">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div> Stage 3: Early Success
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Score: 3</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-normal mt-1 ml-5">(Strategy Publ.)</div>
                                </th>
                                <th className="p-4 md:p-6 font-semibold text-slate-700 w-[16.6%] border-l border-slate-100">
                                    <div className="flex items-center gap-2 relative group">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Stage 4: Maturing
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Score: 4</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-normal mt-1 ml-5">(Implementation)</div>
                                </th>
                                <th className="p-4 md:p-6 font-semibold text-slate-700 w-[16.6%] border-l border-slate-100">
                                    <div className="flex items-center gap-2 relative group">
                                        <div className="w-3 h-3 rounded-full bg-purple-600"></div> Stage 5: Role Model
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Score: 5</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-normal mt-1 ml-5">(Leadership / Scaling)</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scoringCriteria.map((row, idx) => {
                                const isNewParameter = idx === 0 || scoringCriteria[idx - 1].parameter !== row.parameter;

                                return (
                                    <React.Fragment key={idx}>
                                        {isNewParameter && (
                                            <tr className="bg-slate-100 border-b-2 border-slate-200">
                                                <td colSpan={6} className="p-4 md:px-6 md:py-5 font-extrabold text-slate-900 text-lg tracking-wide">
                                                    {row.parameter}
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="hover:bg-blue-50/40 transition-colors group">
                                            <td className="p-4 md:p-6 font-semibold text-slate-800 align-top border-r border-slate-50 bg-slate-50/50">
                                                {row.subParameter}
                                            </td>
                                            <td className="p-4 md:p-6 text-sm text-slate-600 align-top border-x border-slate-50">{row.greenfield}</td>
                                            <td className="p-4 md:p-6 text-sm text-slate-600 align-top border-x border-slate-50">{row.openToAdopt}</td>
                                            <td className="p-4 md:p-6 text-sm text-slate-600 align-top border-x border-slate-50 bg-blue-50/20">{row.earlySuccess}</td>
                                            <td className="p-4 md:p-6 text-sm text-slate-600 align-top border-x border-slate-50 bg-indigo-50/10">{row.maturing}</td>
                                            <td className="p-4 md:p-6 text-sm text-slate-600 align-top border-l border-slate-50 bg-purple-50/10">{row.roleModel}</td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Glossary & Disclaimers */}
            <div className="max-w-[90rem] mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Glossary */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 h-full">
                    <BookOpen className="w-6 h-6 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                        <p><strong>IMF AI Preparedness Index (AIPI):</strong> Assesses readiness across 174 countries by evaluating digital infrastructure, human capital, technological innovation, and legal frameworks.</p>
                        <p><strong>Worldwide Governance Indicators (WGI, 2024):</strong> Draws on 35 cross-country data sources to capture governance quality across 200+ economies.</p>
                        <p><strong>Political Stability:</strong> Measures perceptions of the likelihood of political destabilization, violence, or unconstitutional government changes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
