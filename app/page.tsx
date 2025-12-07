import { HomePage } from "./components/main-page/home-page";
import { loadCountries } from "./lib/countries";

export default async function Home(props: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name = "" } = await props.searchParams;
  const countries = await loadCountries(name);
  console.log(countries);
  return <HomePage />;
}
