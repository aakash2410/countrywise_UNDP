import CountryDetailDashboard from '@/components/dashboard/CountryDetailDashboard';
import { philippinesData } from '@/components/dashboard/MockData';

export default function PhilippinesProfile() {
    return (
        <main className="min-h-screen bg-slate-50">
            <CountryDetailDashboard data={philippinesData} />
        </main>
    );
}
