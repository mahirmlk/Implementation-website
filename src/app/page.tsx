import { getAllPapers } from "@/lib/papers";
import HomeClient from "@/components/home-client";

export default async function Home() {
  const papers = getAllPapers();
  return <HomeClient papers={papers} />;
}
