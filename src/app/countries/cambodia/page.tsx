import CountryDetailDashboard from '@/components/dashboard/CountryDetailDashboard';
import { cambodiaData } from '@/components/dashboard/MockData';

export default function CambodiaProfile() {
    return (
        <main className="min-h-screen bg-slate-50">
            <CountryDetailDashboard data={cambodiaData} />
        </main>
    );
}
