import { HomePage } from "./components/main-page/home-page";

export default async function Home(props: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name = "" } = await props.searchParams;

  return <HomePage />;
}
