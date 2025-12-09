import Link from "next/link";
import { DetailsPage } from "../components/details/details-page";
import { Icon } from "../components/common/bi-icon";
import { DetailsPlaceholder } from "../components/details/details-placeholder";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  return {
    title: country,
  };
}

// export const metadata = await generateMetaData()

const Page = async ({ params }: { params: Promise<{ country: string }> }) => {
  const { country } = await params;
  return (
    <div className="px-4 lg:px-0 grow flex flex-col items-start">
      <Link
        className="inline-block my-8 outstand outstand-button p-2 px-8 rounded-lg shadow-2xl"
        href={"/"}
      >
        {" "}
        <Icon name="arrow-left mr-4" /> Back
      </Link>
      <Suspense key={country} fallback={<DetailsPlaceholder />}>
        <DetailsPage country={country} />
      </Suspense>
    </div>
  );
};

export default Page;
