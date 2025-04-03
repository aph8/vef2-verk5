import { notFound } from 'next/navigation';
import { getAllRivers, getRiverBySlug } from '@/lib/datocms';
import RiverDetail from '@/components/RiverDetail';

export async function generateStaticParams() {
  try {
    const rivers = await getAllRivers();
    return rivers.map((river) => ({
      slug: river.slug,
    }));
  } catch (error) {
    console.error('⚠️ Villa í generateStaticParams:', error);
    return [];
  }
}


export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const river = await getRiverBySlug(slug);

  if (!river) {
    notFound();
  }

  return <RiverDetail river={river} />;
}
