import Link from "next/link";
import { Icon } from "../components/common/bi-icon";
export default function NotFound() {
  return (
    <section className="flex grow flex-col items-center justify-center gap-2">
      <Icon name="emoji-angy" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested country.</p>
      <Link
        href="/"
        className="mt-4 rounded-md outstand px-4 py-2 text-sm transition-colors"
      >
        Go Back
      </Link>
    </section>
  );
}
