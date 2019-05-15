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
];

const Header = ({siteTitle = ''}: Props) => (
  <HeaderGradient>
    <HeaderContentWrapper>
      {window.location.href.length - window.location.origin.length > 1 && (
        <AvatarWrapper>
          <Avatar/>
        </AvatarWrapper>
      )}
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
