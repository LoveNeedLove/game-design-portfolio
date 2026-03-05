import { Metadata } from "next";
import { projects } from "../data";
import HomeClient from "./HomeClient";

type Props = {
  searchParams: Promise<{ project?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const projectId = params.project;
  const project = projectId ? projects.find(p => p.id === projectId) : null;

  if (project) {
    return {
      title: `${project.title} — Ismail Benkirane`,
      description: project.shortDescription,
      openGraph: {
        title: `${project.title} — Ismail Benkirane`,
        description: project.shortDescription,
        images: [{ url: project.coverImage, width: 1200, height: 630 }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} — Ismail Benkirane`,
        description: project.shortDescription,
        images: [project.coverImage],
      },
    };
  }

  return {
    title: "Ismail Benkirane - Game Design Portfolio",
    description: "Game Designer dedicated to crafting deep, systemic experiences with a focus on Economy Design, Narrative Design and UX.",
    openGraph: {
      title: "Ismail Benkirane - Game Design Portfolio",
      description: "Game Designer dedicated to crafting deep, systemic experiences with a focus on Economy Design, Narrative Design and UX.",
      type: 'website',
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
