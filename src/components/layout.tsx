import * as React from 'react';
import {Fragment} from 'react';
import Header from './Header';
import './layout.css';
import {useSiteMetadata} from '../hooks';
import styled from 'styled-components';
// @ts-ignore
import favicon from '../images/favicon.png';
import Helmet from 'react-helmet';

interface Props {
  children: React.ReactNode;
}

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 2rem;
  
  @media (min-width: 800px) {
    padding-top: 0;
    transform: translateY(-40px);
  }
`;

const Layout = ({children}: Props) => {
  const {title} = useSiteMetadata();

  return (
    <Fragment>
      <Helmet
        link={[
          {rel: 'shortcut icon', type: 'image/png', href: favicon}
        ]}
      />
      <Header siteTitle={title}/>
      <Body>
        <main>{children}</main>
      </Body>
    </Fragment>
  );
};

export default Layout;
