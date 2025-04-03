import { notFound } from 'next/navigation';
import { getAllRivers, getRiverBySlug } from '@/lib/datocms';
import RiverDetail from '@/components/RiverDetail';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const rivers = await getAllRivers();
  return rivers.map((river) => ({
    slug: river.slug,
  }));
}

export default async function RiverPage({ params }: Props) {
  const awaitedParams = await params;
  const river = await getRiverBySlug(awaitedParams.slug);
  
  if (!river) {
    notFound();
  }

  return <RiverDetail river={river} />;
}
