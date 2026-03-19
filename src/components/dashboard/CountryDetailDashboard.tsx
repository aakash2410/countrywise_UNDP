'use client';

import React, { useState } from 'react';
import {
    Network, Zap, CheckCircle2, AlertCircle, Clock,
    Map, Activity, Users, Building2, Lightbulb, TrendingUp, Handshake, Globe, ShieldCheck, FileText, Cpu, ArrowLeft, X, Info, Radio, Landmark, Banknote
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { Actor, CountryDetailData, MetricCard, ParameterStageEntry } from './MockData';

// Reusable Status Badge
const StatusBadge = ({ status }: { status: string }) => {
    // Extract just the core status by stripping out dashboard-specific suffixes like "- Maturing"
    const displayStatus = status.split(' - ')[0].replace(' Early Success', '').trim();

    const getStyles = () => {
        const lower = status.toLowerCase();
        if (lower.includes('advanced') || lower.includes('mature') || lower.includes('maturing')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        if (lower.includes('early success')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        if (lower.includes('active') || lower.includes('implemented') || lower.includes('role model')) return 'bg-amber-100 text-amber-800 border-amber-200';
        if (lower.includes('greenfield')) return 'bg-slate-100 text-slate-600 border-slate-200';
        if (lower.includes('open to adopt') || lower.includes('open')) return 'bg-sky-100 text-sky-800 border-sky-200';
        return 'bg-slate-100 text-slate-800 border-slate-200';
    };

    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getStyles()}`}>
            {displayStatus || status}
        </span>
    );
};

// Parameter Stage Badge with sub-parameter breakdown
const ParameterStageBadge = ({ entry, pKey }: { entry: ParameterStageEntry; pKey: string }) => {
    const [expanded, setExpanded] = useState(false);
    const stageColors: Record<string, string> = {
        'Greenfield': 'bg-slate-100 text-slate-700 border-slate-300',
        'Open to Adopt': 'bg-sky-100 text-sky-800 border-sky-300',
        'Early Success': 'bg-indigo-100 text-indigo-800 border-indigo-300',
        'Maturing': 'bg-emerald-100 text-emerald-800 border-emerald-300',
        'Role Model': 'bg-amber-100 text-amber-800 border-amber-300',
    };
    const dotColors: Record<string, string> = {
        'Greenfield': 'bg-slate-400',
        'Open to Adopt': 'bg-sky-500',
        'Early Success': 'bg-indigo-500',
        'Maturing': 'bg-emerald-500',
        'Role Model': 'bg-amber-500',
    };
    return (
        <div className="relative">
            <button
                onClick={() => setExpanded(!expanded)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:shadow-sm ${stageColors[entry.parameterStage] || 'bg-slate-100 text-slate-700 border-slate-300'}`}
            >
                <span className="opacity-60 font-mono">{pKey}</span>
                <span className="mx-0.5">·</span>
                {entry.parameterStage}
                <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {expanded && (
                <div className="absolute z-20 mt-2 right-0 bg-white rounded-xl border border-slate-200 shadow-lg p-4 min-w-[280px]">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Sub-Parameters</p>
                    <div className="space-y-2">
                        {entry.subParameters.map((sp, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-3">
                                <span className="text-sm text-slate-700 leading-tight">{sp.name}</span>
                                <span className={`flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md border ${stageColors[sp.stage] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${dotColors[sp.stage] || 'bg-slate-400'}`}></span>
                                    {sp.stage}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Animation Variants
const containerVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0, duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

export default function CountryDetailDashboard({ data }: { data: CountryDetailData }) {
    const [activeTab, setActiveTab] = useState<'Opportunities' | 'Risks' | 'Partnerships'>('Opportunities');
    const [expandedActorId, setExpandedActorId] = useState<string | null>(null);
    const [selectedMetric, setSelectedMetric] = useState<MetricCard | null>(null);
    const [allActorsExpanded, setAllActorsExpanded] = useState(false);

    // --- Utility Helpers ---

    // Auto-highlights financial figures (e.g., $50M, USD 18B, 100%) and specific keywords
    const highlightKeyMetrics = (text: string) => {
        const regex = /(\$?\d+(?:\.\d+)?[MBKmbk]?\b|\d+(?:\.\d+)?%|USD \d+(?:\.\d+)?[MBKmbk]?|RM\d+(?:\.\d+)?[MBKmbk]?)/g;
        const parts = text.split(regex);
        return parts.map((part, i) => {
            if (part.match(regex)) {
                return <strong key={i} className="bg-amber-100 text-amber-900 px-1 rounded mx-0.5">{part}</strong>;
            }
            return part;
        });
    };

    // --- Render Helpers ---

    // Section A
    const renderMetricCard = (cardData: MetricCard, icon: React.ReactNode) => (
        <motion.div
            variants={itemVariant}
            onClick={() => cardData.modalDetails && setSelectedMetric(cardData)}
            className={`flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all relative overflow-hidden group ${cardData.modalDetails ? 'cursor-pointer hover:shadow-md hover:border-blue-300 hover:-translate-y-1' : ''}`}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 leading-tight">{cardData.title}</h3>
                </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2 items-center">
                <StatusBadge status={cardData.status} />
                {cardData.implementationAgency && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                        {cardData.implementationAgency}
                    </span>
                )}
            </div>
            <p className="text-sm text-slate-600 mt-auto">{cardData.description}</p>
            {cardData.modalDetails && (
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="text-sm font-semibold flex items-center gap-1.5">
                        <Info className="w-4 h-4" /> View Context
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                        <ArrowLeft className="w-4 h-4 rotate-135 transform -rotate-45" />
                    </div>
                </div>
            )}
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">

            {/* Modal Overlay built with AnimatePresence */}
            <AnimatePresence>
                {selectedMetric && selectedMetric.modalDetails && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setSelectedMetric(null)}
                            aria-hidden="true"
                        />

                        {/* Modal Dialog */}
                        <motion.div
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                            variants={modalVariants}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                        >
                            {/* Modal Header */}
                            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                                <div>
                                    <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-slate-900">{selectedMetric.title}</h2>
                                    <div className="mt-2 text-sm text-slate-500">
                                        <StatusBadge status={selectedMetric.status} />
                                        {selectedMetric.modalDetails.timeline && (
                                            <span className="ml-3 italic">&bull; {selectedMetric.modalDetails.timeline}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedMetric(null)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Context/Snapshot/Overview</h3>
                                    <p className="text-slate-700 leading-relaxed text-base">
                                        {selectedMetric.modalDetails.fullContext}
                                    </p>
                                </div>

                                {selectedMetric.modalDetails.keyMetrics && selectedMetric.modalDetails.keyMetrics.length > 0 && (
                                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-800 mb-4">Key Metrics & Milestones</h3>
                                        <ul className="space-y-3">
                                            {selectedMetric.modalDetails.keyMetrics.map((point, idx) => (
                                                <li key={idx} className="flex gap-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium hover:-translate-x-1 duration-200">
                    <ArrowLeft className="w-4 h-4" /> Back to Regional Dashboard
                </Link>
            </div>

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Map className="w-6 h-6 text-blue-600" />
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Country Profile</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{data.countryName}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/scoring"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-xl hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm cursor-pointer"
                    >
                        <ShieldCheck className="w-4 h-4" /> Scoring Methodology
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16">

                {/* Top Level Leadership Quotes */}
                {data.sectionB.leadershipQuote && (
                    <div className="mb-12">
                        <blockquote className="relative p-8 bg-blue-50/50 rounded-2xl border border-blue-100 transition-all hover:bg-blue-50 hover:border-blue-200">
                            <div className="absolute -top-3 left-4 text-6xl text-blue-200/60 font-serif leading-none" aria-hidden="true">&ldquo;</div>
                            <p className="text-xl md:text-2xl font-serif text-slate-800 leading-relaxed italic z-10 relative pl-4">
                                {data.sectionB.leadershipQuote.text}
                            </p>
                            <footer className="mt-4 flex items-center gap-3 pl-4">
                                <div className="h-px w-8 bg-emerald-400"></div>
                                <span className="font-semibold text-slate-900">{data.sectionB.leadershipQuote.author}</span>
                                <span className="text-slate-500 text-sm italic">&mdash; {data.sectionB.leadershipQuote.context}</span>
                            </footer>
                        </blockquote>
                    </div>
                )}

                {/* SECTION A.1: Digital Public Infrastructure */}
                <section aria-labelledby="section-dpi-title">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <Network className="w-8 h-8 text-blue-600" />
                            <h2 id="section-dpi-title" className="text-3xl font-bold tracking-tight">Digital Public Infrastructure</h2>
                        </div>
                        {data.parameterStages?.P2 && <ParameterStageBadge entry={data.parameterStages.P2} pKey="P2" />}
                    </div>
                    <motion.div
                        variants={containerVariant}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {renderMetricCard(data.dpiEcosystem.digitalId, <CheckCircle2 className="w-6 h-6" />)}
                        {renderMetricCard(data.dpiEcosystem.payments, <Zap className="w-6 h-6" />)}
                        {renderMetricCard(data.dpiEcosystem.dataExchange, <Activity className="w-6 h-6" />)}
                    </motion.div>

                    {/* DPI Use Cases */}
                    {data.dpiEcosystem.useCases && data.dpiEcosystem.useCases.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-8"
                        >
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-blue-500" />
                                DPI Use Cases
                                {(() => {
                                    const sp = data.parameterStages?.P2?.subParameters.find(s => s.name.toLowerCase().includes('use case') || s.name.toLowerCase().includes('deployment'));
                                    if (!sp) return null;
                                    const colors: Record<string, string> = { 'Greenfield': 'bg-slate-100 text-slate-700 border-slate-300', 'Open to Adopt': 'bg-sky-100 text-sky-800 border-sky-300', 'Early Success': 'bg-indigo-100 text-indigo-800 border-indigo-300', 'Maturing': 'bg-emerald-100 text-emerald-800 border-emerald-300', 'Role Model': 'bg-amber-100 text-amber-800 border-amber-300' };
                                    return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ml-2 ${colors[sp.stage] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>{sp.stage}</span>;
                                })()}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.dpiEcosystem.useCases.map((uc, idx) => (
                                    <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-200 hover:shadow-md transition-all">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 mb-3">{uc.sector}</span>
                                        <p className="text-sm text-slate-700 leading-relaxed">{uc.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </section>

                {/* SECTION A.2: AI Ecosystems (Expanded) */}
                <section aria-labelledby="section-ai-title">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-8 h-8 text-emerald-600" />
                            <h2 id="section-ai-title" className="text-3xl font-bold tracking-tight">Artificial Intelligence Ecosystem</h2>
                        </div>
                        {data.parameterStages?.P1 && <ParameterStageBadge entry={data.parameterStages.P1} pKey="P1" />}
                    </div>
                    <motion.div
                        variants={containerVariant}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {renderMetricCard(data.aiEcosystem.policy, <FileText className="w-6 h-6" />)}
                        {renderMetricCard(data.aiEcosystem.governance, <Globe className="w-6 h-6" />)}
                        {renderMetricCard(data.aiEcosystem.legislation, <ShieldCheck className="w-6 h-6" />)}
                        {renderMetricCard(data.aiEcosystem.initiatives, <Cpu className="w-6 h-6" />)}
                    </motion.div>
                </section>

                {/* SECTION B: Infrastructure & Politics */}
                {/* SECTION B.1: Digital Infrastructure */}
                <section aria-labelledby="section-infra-title">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <Radio className="w-8 h-8 text-indigo-600" />
                            <h2 id="section-infra-title" className="text-3xl font-bold tracking-tight">Digital Infrastructure</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            {data.parameterStages?.P3 && <ParameterStageBadge entry={data.parameterStages.P3} pKey="P3" />}
                            {data.sectionB.infraModalDetails && (
                                <button
                                    onClick={() => setSelectedMetric({ title: 'Digital Infrastructure', status: '', description: '', modalDetails: data.sectionB.infraModalDetails } as MetricCard)}
                                    className="text-sm font-semibold text-indigo-600 flex items-center gap-1.5 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 w-fit"
                                >
                                    <Info className="w-4 h-4" /> View Context
                                </button>
                            )}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="space-y-8 max-w-3xl">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-lg font-semibold text-slate-700">Access to Electricity</span>
                                    <span className="font-bold text-slate-900">{data.sectionB.electricityAccess}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={data.sectionB.electricityAccess} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="bg-amber-400 h-3 rounded-full" style={{ width: `${data.sectionB.electricityAccess}% ` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-slate-700">Internet Penetration</span>
                                    <span className="font-bold text-slate-900">{data.sectionB.internetPenetration}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={data.sectionB.internetPenetration} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${data.sectionB.internetPenetration}%` }}></div>
                                </div>
                            </div>

                            {data.sectionB.deviceAccess !== undefined && (
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-slate-700">Access to Devices</span>
                                        <span className="font-bold text-slate-900">{data.sectionB.deviceAccess}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={data.sectionB.deviceAccess} aria-valuemin={0} aria-valuemax={100}>
                                        <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${data.sectionB.deviceAccess}%` }}></div>
                                    </div>
                                </div>
                            )}

                            {data.sectionB.dataCenters && (
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-slate-700">Data Centers</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-900 bg-slate-50 py-3 px-4 rounded-xl border border-slate-100">
                                        {data.sectionB.dataCenters}
                                    </div>
                                </div>
                            )}

                            {data.sectionB.digitalInclusion && (
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-slate-700">Digital Inclusion Gap</span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-900 bg-slate-50/80 py-3 px-4 rounded-xl border border-slate-100 italic">
                                        {data.sectionB.digitalInclusion}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* SECTION B.2: Political Context */}
                <section aria-labelledby="section-political-title">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <Landmark className="w-8 h-8 text-emerald-600" />
                            <h2 id="section-political-title" className="text-3xl font-bold tracking-tight">Political Context</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            {data.parameterStages?.P4 && <ParameterStageBadge entry={data.parameterStages.P4} pKey="P4" />}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-colors"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="space-y-6 max-w-4xl">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><Building2 className="w-5 h-5 text-slate-400" /></div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Political Stability</h4>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{data.sectionB.politicalStability}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1"><Clock className="w-5 h-5 text-slate-400" /></div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Election Cycles</h4>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{data.sectionB.electionCycles}</p>
                                </div>
                            </div>
                            {data.sectionB.politicalSubParameters && data.sectionB.politicalSubParameters.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-emerald-100/80">
                                    <h4 className="text-sm font-bold tracking-wider text-emerald-800 uppercase mb-4">Key Indicators & Capacities</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data.sectionB.politicalSubParameters.map((param, idx) => (
                                            <div key={idx} className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/80">
                                                <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wide">{param.label}</span>
                                                <span className="block text-sm font-medium text-emerald-900 mt-1.5 leading-relaxed">{param.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* SECTION C: Ecosystem Actors Map */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    aria-labelledby="section-c-title"
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="p-8 md:p-10 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-slate-700" />
                            <h2 id="section-c-title" className="text-3xl font-bold tracking-tight">Stakeholder Participation</h2>
                        </div>
                        {data.parameterStages?.P5 && <ParameterStageBadge entry={data.parameterStages.P5} pKey="P5" />}
                    </div>

                    <div className="w-full overflow-x-auto">
                        {(() => {
                            const subParamOrder = ['Lead Agency & Govt Coordination', 'Private Sector', 'Development Partners & MDBs', 'Academic & Research', 'Civil Society'];
                            const subParamColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
                                'Lead Agency & Govt Coordination': { bg: 'bg-blue-50/50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
                                'Private Sector': { bg: 'bg-violet-50/50', border: 'border-violet-200', text: 'text-violet-800', badge: 'bg-violet-100 text-violet-800 border-violet-200' },
                                'Development Partners & MDBs': { bg: 'bg-emerald-50/50', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                                'Academic & Research': { bg: 'bg-amber-50/50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
                                'Civil Society': { bg: 'bg-rose-50/50', border: 'border-rose-200', text: 'text-rose-800', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
                            };
                            const grouped = subParamOrder.map(type => ({
                                type,
                                actors: data.sectionC.actors.filter((a: Actor) => a.type === type),
                            })).filter(g => g.actors.length > 0);
                            return (
                                <div className="divide-y divide-slate-100">
                                    {grouped.map((group) => {
                                        const colors = subParamColors[group.type] || { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700 border-slate-200' };
                                        return (
                                            <div key={group.type}>
                                                <div className={`px-8 py-4 ${colors.bg} border-l-4 ${colors.border}`}>
                                                    <span className={`text-sm font-bold uppercase tracking-wider ${colors.text}`}>{group.type}</span>
                                                </div>
                                                {group.actors.map((actor: Actor) => (
                                                    <div key={actor.id} className="px-8 py-6 hover:bg-blue-50/30 transition-colors border-b border-slate-50">
                                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                            <div className="md:w-1/3">
                                                                <h4 className="font-bold text-slate-900 text-base">{actor.name}</h4>
                                                                <span className={`inline-flex items-center mt-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${colors.badge}`}>{actor.role}</span>
                                                            </div>
                                                            <div className="md:w-2/3">
                                                                {actor.initiatives && actor.initiatives.length > 0 ? (
                                                                    <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700">
                                                                        {actor.initiatives.map((init, idx) => (
                                                                            <li key={idx} className="leading-relaxed">{init}</li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <span className="text-slate-500 italic text-sm">No explicit initiatives documented.</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </div>
                </motion.section>

                {/* SECTION C.2: Funding Landscape */}
                {data.sectionB.fundingLandscape && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-start my-12"
                    >
                        <div className="flex-shrink-0 mt-1 bg-white p-3 rounded-xl shadow-sm border border-indigo-100">
                            <Banknote className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                                <h3 className="text-2xl font-bold tracking-tight text-indigo-900">Funding Landscape</h3>
                                {data.parameterStages?.P6 && <ParameterStageBadge entry={data.parameterStages.P6} pKey="P6" />}
                            </div>
                            <p className="text-indigo-800 leading-relaxed font-medium text-lg">
                                {data.sectionB.fundingLandscape}
                            </p>
                        </div>
                    </motion.section>
                )}

                {/* SECTION D: Strategic Insights Tabs */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    aria-labelledby="section-d-title"
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm"
                >
                    <div className="p-8 md:p-10 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <Lightbulb className="w-8 h-8 text-slate-700" />
                            <h2 id="section-d-title" className="text-3xl font-bold tracking-tight">Strategic Insights</h2>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-6" role="tablist">
                            <button
                                role="tab"
                                aria-selected={activeTab === 'Opportunities'}
                                onClick={() => setActiveTab('Opportunities')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border-2 ${activeTab === 'Opportunities' ? 'border-emerald-500 text-emerald-800 bg-emerald-100' : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-emerald-200'}`}
                            >
                                <TrendingUp className="w-5 h-5" /> Emerging Opportunities
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeTab === 'Risks'}
                                onClick={() => setActiveTab('Risks')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border-2 ${activeTab === 'Risks' ? 'border-rose-500 text-rose-800 bg-rose-100' : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-rose-200'}`}
                            >
                                <AlertCircle className="w-5 h-5" /> Potential Risks
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeTab === 'Partnerships'}
                                onClick={() => setActiveTab('Partnerships')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border-2 ${activeTab === 'Partnerships' ? 'border-blue-500 text-blue-800 bg-blue-100' : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-blue-200'}`}
                            >
                                <Handshake className="w-5 h-5" /> Partnerships
                            </button>
                        </div>

                        <div className="pt-6" role="tabpanel">
                            <ul className="space-y-4">
                                {activeTab === 'Opportunities' ? (
                                    data.sectionD.opportunities.length > 0 ? (
                                        data.sectionD.opportunities.map(item => (
                                            <li key={item.id} className="flex gap-4 bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100">
                                                <div className="mt-1"><CheckCircle2 className="w-6 h-6 text-emerald-600" /></div>
                                                <p className="text-slate-800 leading-relaxed text-base">{highlightKeyMetrics(item.text)}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex gap-4 bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100 italic text-slate-500">Data Pending: Information will be updated in the upcoming cycle.</li>
                                    )
                                ) : activeTab === 'Risks' ? (
                                    data.sectionD.risks.length > 0 ? (
                                        data.sectionD.risks.map(item => (
                                            <li key={item.id} className="flex gap-4 bg-rose-50/30 p-5 rounded-2xl border border-rose-100">
                                                <div className="mt-1"><AlertCircle className="w-6 h-6 text-rose-600" /></div>
                                                <p className="text-slate-800 leading-relaxed text-base">{highlightKeyMetrics(item.text)}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex gap-4 bg-rose-50/30 p-5 rounded-2xl border border-rose-100 italic text-slate-500">Data Pending: Information will be updated in the upcoming cycle.</li>
                                    )
                                ) : activeTab === 'Partnerships' ? (
                                    data.sectionD.partnerships.length > 0 ? (
                                        data.sectionD.partnerships.map(item => (
                                            <li key={item.id} className="flex gap-4 bg-blue-50/30 p-5 rounded-2xl border border-blue-100">
                                                <div className="mt-1"><Handshake className="w-6 h-6 text-blue-600" /></div>
                                                <p className="text-slate-800 leading-relaxed text-base">{highlightKeyMetrics(item.text)}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex gap-4 bg-blue-50/30 p-5 rounded-2xl border border-blue-100 italic text-slate-500">Data Pending: Information will be updated in the upcoming cycle.</li>
                                    )
                                ) : null}
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION E: Information Sources */}
                {data.sources && data.sources.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        aria-labelledby="section-sources-title"
                        className="bg-slate-50/50 rounded-2xl p-8 shadow-sm border border-slate-200 mt-12"
                    >
                        <h2 id="section-sources-title" className="text-xl font-bold tracking-tight text-slate-800 border-b border-slate-200 pb-4 mb-6">Information Sources</h2>
                        <ul className="space-y-3">
                            {data.sources.map((link, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <Globe className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline break-all">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
