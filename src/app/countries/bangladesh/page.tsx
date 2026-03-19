import CountryDetailDashboard from '@/components/dashboard/CountryDetailDashboard';
import { bangladeshData } from '@/components/dashboard/MockData';

export default function BangladeshProfile() {
    return (
        <main className="min-h-screen bg-slate-50">
            <CountryDetailDashboard data={bangladeshData} />
        </main>
    );
}
