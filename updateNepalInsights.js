const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const newNepalStrategicInsights = {
    opportunities: [
        { id: 'nepal-o1', text: 'Nepal Digital Transformation Project: World Bank approved a $50m loan that aims to strengthen Nepal’s digital public infrastructure and improve the delivery and use of inclusive, high-impact digital government services.' },
        { id: 'nepal-o2', text: 'Broadband and Data Infrastructure Expansion: IFC, Standard Chartered Bank Nepal Limited, and WorldLink Communications Ltd. partner on $29 million project to expand connectivity, create jobs, and drive economic growth.' }
    ],
    risks: [
        { id: 'nepal-r1', text: 'GIDC lacks resources which results in outages/breaches: Government Integrated Data Center (GIDC) is understaffed and lacks resources including technical infrastructure which led to outages and data loss across 10–15 agencies in 2023.' },
        { id: 'nepal-r2', text: 'Weak Systems and Limited Uptake: DPI understanding remains low beyond central ministries, limiting sectoral uptake. Nepal scores 0.439 on the GovTech Index, reflecting weak systems and skills across government.' },
        { id: 'nepal-r3', text: 'Data Protection Landscape: The 2024 Draft Cyber Bill has been criticised for potentially enabling government surveillance and censorship — especially through a proposed national internet gateway — while lacking strong privacy safeguards and adequate public consultation.' }
    ],
    partnerships: [
        { id: 'nepal-p1', text: 'Strengthening of GDIC: UNDP could support the institutional strengthening of the Government Integrated Data Center (GIDC) by helping design operational standards, cybersecurity protocols, and workforce capacity programmes for digital infrastructure management.' },
        { id: 'nepal-p2', text: 'Focused Capacity-Building Across High-Priority Ministries: Since DPI understanding remains concentrated within central ministries, UNDP could run capacity-building programmes for specific ministries to increase adoption of digital systems.' },
        { id: 'nepal-p3', text: 'Supporting Rights-Based Data Governance: With concerns around the 2024 Draft Cyber Bill, UNDP could facilitate multi-stakeholder dialogue and technical assistance on data protection and cybersecurity legislation, ensuring alignment with international norms.' },
        { id: 'nepal-p4', text: 'Given Nepal’s focus on digital infrastructure expansion, there is scope for the country to become a part of the 50-in-5 initiative.' }
    ]
};

// Target specifically the sectionD inside exported nepalData 
// We need to carefully regex replace the opportunities, risks, and partnerships arrays
const nepalSectionDRegex = /(export const nepalData: CountryDetailData = \{[\s\S]*?sectionD:\s*\{)(\s*opportunities:\s*\[[\s\S]*?\],\s*risks:\s*\[[\s\S]*?\],\s*partnerships:\s*\[[\s\S]*?\])(\s*\},[\s\S]*?\};)/g;

mockDataStr = mockDataStr.replace(nepalSectionDRegex, (match, prefix, oldSectionD, suffix) => {

    const newOpportunitiesStr = newNepalStrategicInsights.opportunities.map(o =>
        `      { id: '${o.id}', text: '${o.text.replace(/'/g, "\\'")}' }`
    ).join(',\n');

    const newRisksStr = newNepalStrategicInsights.risks.map(r =>
        `      { id: '${r.id}', text: '${r.text.replace(/'/g, "\\'")}' }`
    ).join(',\n');

    const newPartnershipsStr = newNepalStrategicInsights.partnerships.map(p =>
        `      { id: '${p.id}', text: '${p.text.replace(/'/g, "\\'")}' }`
    ).join(',\n');

    const newSectionD = `
    opportunities: [
${newOpportunitiesStr}
    ],
    risks: [
${newRisksStr}
    ],
    partnerships: [
${newPartnershipsStr}
    ]`;

    return `${prefix}${newSectionD}${suffix}`;
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log("Successfully updated Nepal's Strategic Insights (Section D)");
