import CountryDetailDashboard from '@/components/dashboard/CountryDetailDashboard';
import { malaysiaData } from '@/components/dashboard/MockData';

export default function MalaysiaProfile() {
    return (
        <main className="min-h-screen bg-slate-50">
            <CountryDetailDashboard data={malaysiaData} />
        </main>
    );
}
