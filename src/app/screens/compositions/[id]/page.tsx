import { notFound } from "next/navigation";
import SongDetailLayout from "@/app/components/SongDetailLayout";
import { getCompositions, getComposition, getContactInfo } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const songs = await getCompositions();

  return songs.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const song = await getComposition(id);

  if (!song) {
    return { title: "Composition Not Found" };
  }

  const description =
    song.description ??
    `${song.title}, a choral composition by Hannah Kimball.`;
  const title = `${song.title} | Compositions`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Hannah Kimball`,
      description,
      url: `/compositions/${id}`,
    },
  };
}

export default async function CompositionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [song, contact] = await Promise.all([
    getComposition(id),
    getContactInfo(),
  ]);

  if (!song) notFound();

  return (
    <SongDetailLayout
      song={song}
      backHref="/compositions"
      backLabel="All Compositions"
      aboutTitle="About This Piece"
      sidebarTitle="Interested in performing this work?"
      contactEmail={contact.email}
    />
  );
}
