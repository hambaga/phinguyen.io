import * as React from 'react';
import Layout from '../../components/layout';
import {graphql} from 'gatsby';
import {BlogPostWrapper, Title, Date, ImageCredit} from './styled-components';
import Img from 'gatsby-image';
import {Paper} from '../../components/UIKit';
import SEO from '../../components/SEO';

interface Props {
  data: {
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        description: string;
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
  const {title, description, date, imageAuthor, image, imageCredit, tags} = post.frontmatter;

  return (
    <Layout>
      <SEO description={description} title={title} keywords={tags}/>
      <Paper noMobile>
        <BlogPostWrapper>
          <Title>{title}</Title>
          <Date>{date}</Date>
          <Img fluid={image.childImageSharp.fluid} />
          <ImageCredit>Image by <a rel="noopener noreferrer" target="_blank" href={imageCredit}>{imageAuthor}</a></ImageCredit>
          <div dangerouslySetInnerHTML={{__html: post.html}}/>
        </BlogPostWrapper>
      </Paper>
    </Layout>
  );
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
        date (formatString: "MMMM DD, YYYY")
        description
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
