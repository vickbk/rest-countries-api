import { Region } from "@yusifaliyevpro/countries/types";

export type RegionParams = {
  region: Region;
  country?: string;
} & PagingParams;

export type PagingParams = {
  page?: number;
};
