import { notFound } from 'next/navigation';
import { getAllRivers } from '@/lib/datocms';
import RiverSearch from '@/components/RiverSearch';
import '@/styles/rivers.scss';

export default async function RiversPage() {
  const rivers = await getAllRivers();
  if (!rivers || rivers.length === 0) {
    notFound();
  }

  const uniqueRegions = Array.from(new Set(rivers.flatMap((r) => r.region))).sort();

  return (
    <main>
      <h1>Veiðiár</h1>
      <RiverSearch rivers={rivers} regions={uniqueRegions} />
    </main>
  );
}
