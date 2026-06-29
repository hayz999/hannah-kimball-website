import { notFound } from 'next/navigation';
import SongDetailLayout from '@/app/components/SongDetailLayout';
import { getArrangements, getArrangement, getContactInfo } from '@/lib/data';

export const revalidate = 60;

export async function generateStaticParams() {
  const songs = await getArrangements();
  return songs.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = await getArrangement(id);
  return { title: song ? `${song.title} | Arrangements | Hannah Kimball` : 'Arrangement Not Found' };
}

export default async function ArrangementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [song, contact] = await Promise.all([getArrangement(id), getContactInfo()]);

  if (!song) notFound();

  return (
    <SongDetailLayout
      song={song}
      backHref="/arrangements"
      backLabel="All Arrangements"
      aboutTitle="About This Arrangement"
      sidebarTitle="Interested in performing this arrangement?"
      contactEmail={contact.email}
    />
  );
}
