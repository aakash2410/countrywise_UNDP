const fs = require('fs');

const summaries = {
    Malaysia: [
        { label: "Elections", value: "5-year cycle (last: Nov 2022). Historical instability since 2020 led to changes in coalition governments." },
        { label: "Governance Structure", value: "Federal Parliamentary Democracy under a Constitutional Monarchy with distinct Executive, Judicial, and Legislative branches." },
        { label: "Political Stability", value: "Stable but fragile. Ranked 44/167 (Flawed Democracy). Metrics: Accountability (54.6), Stability (72.4), Rule of Law (62.9)." },
        { label: "Institutional Capacity", value: "Strong focus on digital upskilling via MyDIGITAL, Public Sector AI Guidelines, and private partnerships (e.g., Microsoft). Lacks a uniform training mandate." },
        { label: "Leadership Champions", value: "Prime Minister Anwar Ibrahim and Minister of Digital Gobind Singh Deo are vocal advocates for inclusive, AI-driven transformation." },
        { label: "Key Influencers", value: "MOSTI AI Governance Structures, National Digital Economy Council (MED4IRN), and the Prime Minister's Office." }
    ],
    Cambodia: [
        { label: "Elections", value: "5-year cycle (last: 2023-24; next: 2028-29). Predominantly single-party governance model." },
        { label: "Governance Structure", value: "Constitutional Monarchy with a Parliamentary system, governed centrally with one-party dominance." },
        { label: "Political Stability", value: "Classified as 'Authoritarian' (Rank 123/169) in the 2024 Democracy Index." },
        { label: "Digital Priority", value: "High priority on human development and digital skills, prominently featuring a National AI Strategy draft and the National Research Center on AI for Education." },
        { label: "Institutional Capacity", value: "Data infrastructure capacity is improving steadily (2019-2023), aligning with long-term digital transformation objectives." },
        { label: "Leadership Champions", value: "Prime Minister Hun Manet and Minister of Post and Telecommunications expressly champion digital skills and ethical technology." },
        { label: "Key Influencers", value: "Ministry of Post and Telecommunications (MPTC) and Ministry of Industry, Science, Technology and Innovation (MISTI)." }
    ],
    Philippines: [
        { label: "Elections", value: "6-year presidential terms; 3-year midterms (last: May 2025; next presidential: 2028). Transitions are often influenced by political alliance shifts." },
        { label: "Governance Structure", value: "Unitary Republic with significant decentralization to local governments, plus the autonomous BARMM region." },
        { label: "Political Stability", value: "Constitutionally stable but prone to elite factional polarization. Accountability is relatively high, but political stability counts are impacted by internal conflicts." },
        { label: "Digital Priority", value: "Shifting from basic connectivity to heavy digital economy emphasis (AI and cloud-first policies) targeting 12% GDP contribution by 2026." },
        { label: "Institutional Capacity", value: "Uneven. Central agencies demonstrate high technical capacity, whereas rural local government units often lack sufficient budget and technical staff." },
        { label: "Leadership Champions", value: "President Marcos Jr. (championing National ID) and DICT Secretary Henry Rhoel Aguda (driving tech ecosystem orchestration)." },
        { label: "Key Influencers", value: "DICT (implementer), NEDA (funding), and Anti-Red Tape Authority (enforcing service automation)." },
        { label: "Civil Society", value: "Vibrant and highly active, though facing challenges with disinformation and the complete inclusion of marginalized groups." }
    ],
    Bangladesh: [
        { label: "Elections", value: "National elections have recently concluded, initiating transitions in parliamentary dynamics." },
        { label: "Governance Structure", value: "Centralized Democratic Republic. Unicameral parliament (Jatiya Sangsad) with an indirectly elected President and Prime Minister-led cabinet." },
        { label: "Political Stability", value: "Faces challenges. Scored lower on global Governance Indicators, particularly in Control of Corruption (25.5) and Accountability (36.5)." },
        { label: "Digital Priority", value: "Transitioning from 'Digital Bangladesh' to 'Smart Bangladesh 2041,' prioritizing secure AI ecosystems and aiming for 50k cybersecurity experts by 2030." },
        { label: "Institutional Capacity", value: "Moderate macroeconomic management rating (3/6), reflecting ongoing efforts to improve central policy implementation." },
        { label: "Leadership Champions", value: "Strategic capacity-building partnerships formally signed with the e-Governance Academy and British Council to advance digital frameworks." },
        { label: "Key Influencers", value: "a2i (Aspire to Innovate), Bangladesh Bank, and the ICT Division of the Ministry of Posts and Telecommunications." },
        { label: "Technical Expertise", value: "Specialized authorities (BGD e-GOV CIRT, Digital Service Design Lab) collaborate tightly with academia to train civil servants." }
    ],
    Nepal: [
        { label: "Elections", value: "5-year cycle (next: March 2026). Recent mass youth-led protests (Sept 2025) prompted the appointment of an interim government." },
        { label: "Governance Structure", value: "Federal Democratic Republic (since 2015), comprising seven administrative regions to decentralize power and increase citizen participation." },
        { label: "Political Stability", value: "Historically unstable with 27 Prime Ministers since 1990. Scored 58.8 in Political Stability and 55.8 in Accountability, though government effectiveness remains low (34.1)." },
        { label: "Digital Priority", value: "Executing the 'Digital Nepal Framework,' emphasizing decentralized technology access and foundational e-governance restructuring." },
        { label: "Institutional Capacity", value: "Moderate implementation capacity (rating: 3/6), constrained by structural turnover and resourcing gaps." },
        { label: "Leadership Champions", value: "Previous leadership explicitly endorsed the Digital Nepal Framework and successfully pushed Cabinet approval of the National AI Policy." },
        { label: "Technical Expertise", value: "GovTech Index score (0.439) indicates a pressing need to upgrade technical skills and core systems across the civil service suite." },
        { label: "Civil Society", value: "Highly active network of nearly 50,000 NGOs, user groups, and tech policy think-tanks (e.g. Digital Rights Nepal) driving civil transparency." }
    ]
};

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

Object.keys(summaries).forEach(country => {
    const dataKey = country.toLowerCase() === 'philippines' ? 'philippines' : country.toLowerCase();

    // Create the replacement string block
    const replacementStr = summaries[country].map(item => `      { label: '${item.label}', value: '${item.value.replace(/'/g, "\\'")}' }`).join(',\n');

    // Target the array bounds in string exactly: politicalSubParameters: [ ... ],\n      leadershipQuote:
    const regex = new RegExp(`(export const ${dataKey}Data: CountryDetailData = \\{[\\s\\S]*?politicalSubParameters: \\[\n?)[\\s\\S]*?(\n?\\s*\\]\,\\n\\s*(?:leadershipQuote:|\\}\\,\n?\\s*sectionC:))`, 'g');

    mockData = mockData.replace(regex, `$1${replacementStr}$2`);
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log('Successfully injected summarized political blocks.');
