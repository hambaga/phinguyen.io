import * as React from 'react';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import {Paper} from '../components/UIKit';
import {graphql, Link} from 'gatsby';
import {format} from 'date-fns';
import Avatar from '../components/avatar';
import Img from 'gatsby-image';

const BlogWrapper = styled.div`

`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 50px;
  
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 20px;
  }
`;

const AvatarWrapper = styled.div`
  height: 200px;
  width: 200px;
`;

const Logos = styled.div`
  display: flex;
  padding-top: 20px;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  height: 30px;
  width: 30px;
  display: block;
  margin: 5px;
`;

export default (props) => {
  console.log(props.data.logos);
  const postList = props.data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <Paper padding={2.5}>
        <HeaderWrapper>
          <AvatarWrapper>
            <Avatar/>
          </AvatarWrapper>
          <div>
            <h2>Hello!</h2>
            <span>
              My name is Hong Phi Nguyen and this is my personal blog. I love talking about tech, web development and various
              different topics in the industry.
            </span>
            <Logos>
              {props.data.logos.edges.map(({node}, i) => (
                <Logo>
                  <Img key={i} fluid={node.childImageSharp.fluid}/>
                </Logo>
              ))}
            </Logos>
          </div>
        </HeaderWrapper>
      </Paper>
      <Paper noMobile space={2} padding={2.5}>
        <h2>Blog</h2>
        {postList.edges.map(({node}) => (
          <BlogWrapper key={node.frontmatter.title}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
            <span>{format(node.frontmatter.date, 'MMMM, DD, YYYY')}</span>
            <p>{node.excerpt + ' '}
              <Link to={node.fields.slug}>
                Read more
              </Link>
            </p>
          </BlogWrapper>
        ))}
      </Paper>
    </Layout>
  );
};

export const listQuery = graphql`
  query ListQuery {
    logos: allFile(filter: { absolutePath: { regex: "/logos/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(base64Width: 30) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`;

