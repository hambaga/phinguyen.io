import styled from 'styled-components';

export const BlogPostWrapper = styled.div`
  background: white;
  padding: 5rem;
  border-radius: 10px;
  
  @media (max-width: 800px) {
    padding: 0;
    background: transparent;
    box-shadow: none;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Date = styled.p`
  text-align: center;
`;