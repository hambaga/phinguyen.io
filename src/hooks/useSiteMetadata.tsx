import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadata {
  title: string;
  description: string;
  author: string;
}

export const useSiteMetadata = (): SiteMetadata => {
  const {site} = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  return site.siteMetadata;
};
