import * as React from 'react';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import {Paper} from '../components/UIKit';
import {graphql, Link} from 'gatsby';
import {format} from 'date-fns';
import Avatar from '../components/avatar';

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

const Logo = styled.img`
  height: 30px;
  display: block;
  margin: 5px;
`;

export default (props) => {
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
              <Logo src="https://camo.githubusercontent.com/0e253d12e92c4661a0688132d034a543efe133dc/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f747970657363726970742e737667"/>
              <Logo src="https://cdn.auth0.com/blog/react-js/react.png"/>
              <Logo src="https://hackr.io/tutorials/electron/logo-electron.svg?ver=1551354757"/>
              <Logo src="https://vuejs.org/images/logo.png"/>
              <Logo src="https://jaystack.com/wp-content/uploads/2015/12/nodejs-logo-e1497443346889.png"/>
              <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png" alt=""/>
              <Logo src="https://seeklogo.com/images/A/apollo-logo-DC7DD3C444-seeklogo.com.png"/>
              <Logo src="https://user-images.githubusercontent.com/10767740/27283514-9260e192-54ec-11e7-91f9-18550615a7a9.png"/>
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

