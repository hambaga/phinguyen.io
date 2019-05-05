import * as React from 'react';
import {Fragment} from 'react';
import Header from './header';
import './layout.css';
import {useSiteMetadata} from '../hooks';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`;

const Layout = ({children}: Props) => {
  const {title} = useSiteMetadata();

  return (
    <Fragment>
      <Header siteTitle={title} />
      <Body>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Body>
    </Fragment>
  );
};

export default Layout;
