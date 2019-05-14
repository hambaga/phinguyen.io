import * as React from 'react';
import Layout from '../../components/layout';
import {graphql} from 'gatsby';
import {BlogPostWrapper, Title, Date} from './styled-components';
import {format} from 'date-fns';
import Helmet from 'react-helmet';

interface Props {
  data: {
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string
      }
    }
  }
}

const BlogPost = ({data}: Props) => {
  const post = data.markdownRemark;
  const {title, date} = post.frontmatter;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <BlogPostWrapper>
        <Title>{title}</Title>
        <Date>{format(date, 'MMMM DD, YYYY')}</Date>
        <div dangerouslySetInnerHTML={{__html: post.html}}/>
      </BlogPostWrapper>
    </Layout>
  )
};

export default BlogPost;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: {slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
      }
    }
  }
`;
