import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 0.9rem;
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const GithubLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #495057;
  }
`;

export const GithubIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`; 