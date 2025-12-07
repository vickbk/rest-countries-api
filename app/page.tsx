import { HomePage } from "./components/main-page/home-page";

export default async function Home(props: {
  searchParams: Promise<{ country?: string }>;
}) {
  const { country = "" } = await props.searchParams;

  return <HomePage country={country} />;
}
