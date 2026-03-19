import CountryDetailDashboard from '@/components/dashboard/CountryDetailDashboard';
import { nepalData } from '@/components/dashboard/MockData';

export default function NepalProfile() {
    return (
        <main className="min-h-screen bg-slate-50">
            <CountryDetailDashboard data={nepalData} />
        </main>
    );
}
