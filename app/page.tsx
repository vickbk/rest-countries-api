import { HomePage } from "./components/main-page/home-page";
import { Regions } from "./lib/countries";

export default async function Home(props: {
  searchParams: Promise<{ country?: string; region: Regions }>;
}) {
  const searchParams = await props.searchParams;
  return <HomePage {...searchParams} />;
}
