import styled, {css} from 'styled-components';

export const HeaderGradient = styled.div`
  padding: 30px 30px 30px 25px;
  background: linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
  
  @media (min-width: 800px) {
    height: 150px;
  }
`;

export const HeaderContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-column-gap: 15px;
  align-items: center;
  
  a {
    font-size: 1.2rem;
    color: white;
    font-weight: 700;
  }
`;

export const AvatarWrapper = styled.div`
  width: 40px;
  height: auto;
  border-radius: 50%;
`;

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  grid-column-gap: 5px;
  justify-content: center;
  
  a {
    margin-right: 20px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;