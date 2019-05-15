import * as React from 'react';
import {AvatarWrapper, HeaderContentWrapper, HeaderGradient, NavWrapper} from './styled-components';
import Avatar from '../avatar';
import {Link} from 'gatsby';
import {Location} from '@reach/router';

interface Props {
  siteTitle?: string;
}

interface Site {
  label: string;
  url: string;
}

const sites: Site[] = [
];

const Header = ({siteTitle = ''}: Props) => (
  <HeaderGradient>
    <HeaderContentWrapper>
      <Location>
        {({location}) => location.pathname !== '/' && (
          <AvatarWrapper>
            <Avatar/>
          </AvatarWrapper>
        )}
      </Location>

      <Link to="/">{siteTitle}</Link>
      <div/>
      <NavWrapper>
        {sites.map(({label, url}) => (
          <Link key={label} to={url}>{label}</Link>
        ))}
      </NavWrapper>
    </HeaderContentWrapper>
  </HeaderGradient>
);

export default Header;
