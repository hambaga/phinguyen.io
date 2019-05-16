import * as React from 'react';
import Layout from '../../components/layout';
import {graphql} from 'gatsby';
import {BlogPostWrapper, Title, Date, ImageCredit} from './styled-components';
import {format} from 'date-fns';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import {Paper} from '../../components/UIKit';
import SEO from '../../components/SEO';

interface Props {
  data: {
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        tags: string[];
        title: string;
        date: string;
        imageCredit: string;
        imageAuthor: string;
        image: {
          childImageSharp: {
            fluid: any;
          }
        }
      }
    }
  }
}

const BlogPost = ({data}: Props) => {
  const post = data.markdownRemark;
  const {title, date, imageAuthor, image, imageCredit, tags} = post.frontmatter;

  return (
    <Layout>
      <SEO title={title} keywords={tags}/>
      <Paper noMobile>
        <BlogPostWrapper>
          <Title>{title}</Title>
          <Date>{format(date, 'MMMM DD, YYYY')}</Date>
          <Img fluid={image.childImageSharp.fluid} />
          <ImageCredit>Image by <a rel="noopener noreferrer" target="_blank" href={imageCredit}>{imageAuthor}</a></ImageCredit>
          <div dangerouslySetInnerHTML={{__html: post.html}}/>
        </BlogPostWrapper>
      </Paper>
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
        tags
        title
        date
        imageCredit
        imageAuthor
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
