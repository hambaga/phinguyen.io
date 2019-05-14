import * as React from 'react';
import {Link} from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import Avatar from '../components/avatar';

const ImageWrapper = styled.div`
  max-width: 300px;
  margin-bottom: 1.45rem;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Avatar/>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
