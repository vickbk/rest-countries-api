import Link from "next/link";
import { DetailsPage } from "../components/details/details-page";
import { Icon } from "../components/common/icon";
import { DetailsPlaceholder } from "../components/details/details-placeholder";
import { Suspense } from "react";

const Page = async () => {
  return (
    <div className="px-4 lg:px-0 grow flex flex-col items-start">
      <Link
        className="inline-block my-8 outstand p-2 px-8 rounded-lg"
        href={"/"}
      >
        {" "}
        <Icon name="arrow-left mr-4" /> Back
      </Link>
      <Suspense fallback={<DetailsPlaceholder />}>
        <DetailsPage />
      </Suspense>
    </div>
  );
};

export default Page;
