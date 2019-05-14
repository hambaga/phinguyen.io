import * as React from 'react';
import {AvatarWrapper, HeaderContentWrapper, HeaderGradient, NavWrapper} from './styled-components';
import Avatar from '../avatar';
import {Link} from 'gatsby';

interface Props {
  siteTitle?: string;
}

interface Site {
  label: string;
  url: string;
}

const sites: Site[] = [
  {label: 'Blog', url: '/blog'},
  {label: 'About Me', url: '/me'}
];

const Header = ({siteTitle = ''}: Props) => (
  <HeaderGradient>
    <HeaderContentWrapper>
      <AvatarWrapper>
        <Avatar/>
      </AvatarWrapper>
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
