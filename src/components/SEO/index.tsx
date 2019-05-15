import * as React from 'react';
import Helmet from 'react-helmet';
import {useSiteMetadata} from '../../hooks';
// @ts-ignore
import avatar from '../../images/avatar.jpg';

interface Props {
  description?: string;
  lang?: string;
  meta?: JSX.IntrinsicElements['meta'][];
  keywords?: string[];
  title: string;
}

const Index = ({
  description = '',
  lang = 'en',
  meta = [],
  keywords = [],
  title,
}: Props) => {
  const siteMetadata = useSiteMetadata();

  const metaDescription = description || siteMetadata.description;
  const metaProps = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: `${title} | ${siteMetadata.title}`,
    },
    {
      property: `og:image`,
      content: avatar
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: `${title} | ${siteMetadata.title}`,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    ...(keywords.length > 0
      ? [{
        name: `keywords`,
        content: keywords.join(`, `),
      }] : []
    ),
    ...meta
  ];

  return (
    <Helmet
      htmlAttributes={{lang}}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={metaProps}
    />
  );
};

export default Index;
