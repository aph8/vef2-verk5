import { GraphQLClient } from 'graphql-request';
import { StructuredTextDocument } from 'react-datocms';

const endpoint = 'https://graphql.datocms.com/';

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
});

export interface ResponsiveImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  base64: string;
  sizes: string;
}

export interface River {
  id: string;
  title: string;
  slug: string;
  description: {
    value: StructuredTextDocument ;
  };
  image: {
    responsiveImage: ResponsiveImage;
  }[];
  fishcount: number;
  season: string;
  bait: string;
  region: string[];
}

interface RiversResponse {
  allFishingspots: River[];
}

export async function getAllRivers(): Promise<River[]> {
  const query = `
    {
      allFishingspots(orderBy: _createdAt_DESC) {
        id
        title
        slug
        description {
          value
        }
        image {
          responsiveImage(imgixParams: { fit: crop, w: 1200, h: 400, auto: format, q: 100 }) {
            src
            width
            height
            alt
            title
            base64
            sizes
          }
        }
        fishcount
        season
        bait
        region
      }
    }
  `;
  const data = await client.request<RiversResponse>(query);
  return data.allFishingspots;
}

export async function getRiverBySlug(slug: string): Promise<River | undefined> {
  const rivers = await getAllRivers();
  return rivers.find((river) => river.slug === slug);
}

export interface HomePageContent {
  title: string;
  text: {
    value: StructuredTextDocument ;
  };
}

interface HomePageResponse {
  homepage: HomePageContent;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const query = `
    {
      homepage {
        title
        text {
          value
        }
      }
    }
  `;
  const data = await client.request<HomePageResponse>(query);
  return data.homepage;
}
