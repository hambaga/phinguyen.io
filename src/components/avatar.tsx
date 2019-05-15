import * as React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  {
    placeholderImage: file(relativePath: {eq: "avatar.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

const Avatar = () => (
  <StaticQuery
    query={query}
    render={data => <Img style={{borderRadius: '50%'}} fluid={data.placeholderImage.childImageSharp.fluid}/>}
  />
);

export default Avatar;
