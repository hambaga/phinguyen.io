import styled, {css} from 'styled-components';

interface PaperProps {
  padding?: number;
  space?: number;
  noMobile?: boolean;
}

export const Paper = styled.div<PaperProps>`
  background: white;
  margin: ${props => props.space | 0}rem 0;
  padding: ${props => props.padding || 5}rem;
  border-radius: 10px;
    
  ${props => props.noMobile && css`
    @media (max-width: 800px) {
      padding: 0;
      background: transparent;
      box-shadow: none;
    }  
  `}
`;
