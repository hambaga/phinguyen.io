import * as React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  {
    placeholderImage: file(relativePath: {eq: "gatsby-astronaut.png"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Image = () => (
  <StaticQuery
    query={query}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid}/>}
  />
);

export default Image;
