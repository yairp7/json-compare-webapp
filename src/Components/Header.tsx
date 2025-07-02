import React from 'react';
import {
  HeaderContainer,
  Logo,
  LogoIcon,
  HeaderRight
} from './Header.styled';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>
          <img src="/logo.svg" alt="JSON Compare Logo" width="32" height="32" />
        </LogoIcon>
        JSON Compare
      </Logo>
      <HeaderRight>
        {/* Placeholder for future content */}
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header; 