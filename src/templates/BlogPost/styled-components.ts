import styled, {css} from 'styled-components';
import {Paper} from '../../components/UIKit';

export const BlogPostWrapper = styled.div`
  img {
    border-radius: 8px;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

const subheading = css`
  font-size: 0.8rem;
  color: grey;
  text-align: center;
`;

export const Date = styled.p`
  ${subheading};
`;

export const ImageCredit = styled.p`
  ${subheading};
  margin-top: 20px;
`;
