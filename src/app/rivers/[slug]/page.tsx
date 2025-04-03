import { notFound } from 'next/navigation';
import { getAllRivers, getRiverBySlug } from '@/lib/datocms';
import RiverDetail from '@/components/RiverDetail';

// Dynamic slugs fyrir static paths
export async function generateStaticParams() {
  const rivers = await getAllRivers();
  return rivers.map((river) => ({
    slug: river.slug,
  }));
}

// 👇 Hér látum við "params" vera Promise og awaitum það
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
