import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../../molecules/SearchBar';
import {
  NavbarContainer,
  NavbarContent,
  Logo,
  LogoText,
  NavbarCenter,
  NavbarRight,
  NavLink,
  CartButton,
  CartBadge,
  UserMenu,
  UserAvatar,
  UserName,
  DropdownArrow,
  DropdownMenu,
  DropdownItem
} from './style';

const Navbar = ({
  cartItemCount = 0,
  user = null,
  onSearch,
  onCartClick,
  onLogoClick,
  onLogout,
  onProfileClick,
  onOrdersClick,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout?.();
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    onProfileClick?.();
  };

  const handleOrdersClick = () => {
    setIsDropdownOpen(false);
    onOrdersClick?.();
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <NavbarContainer className={className}>
      <NavbarContent>
        <Logo onClick={onLogoClick}>
          <LogoText>🛍️ ShoppingStop</LogoText>
        </Logo>

        <NavbarCenter>
          <SearchBar onSearch={onSearch} />
        </NavbarCenter>

        <NavbarRight>
          <NavLink href="/products" className="active">
            Products
          </NavLink>
          
          <CartButton onClick={onCartClick}>
            🛒
            {cartItemCount > 0 && (
              <CartBadge>{cartItemCount > 99 ? '99+' : cartItemCount}</CartBadge>
            )}
          </CartButton>

          {user ? (
            <UserMenu ref={dropdownRef} onClick={handleUserMenuClick}>
              <UserAvatar>
                {getUserInitials(user.name)}
              </UserAvatar>
              <UserName>{user.name}</UserName>
              <DropdownArrow isOpen={isDropdownOpen}>▼</DropdownArrow>
              
              <DropdownMenu isOpen={isDropdownOpen}>
                <DropdownItem onClick={handleProfileClick}>
                  👤 Profile
                </DropdownItem>
                <DropdownItem onClick={handleOrdersClick}>
                  📦 My Orders
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  🚪 Logout
                </DropdownItem>
              </DropdownMenu>
            </UserMenu>
          ) : (
            <NavLink href="/login">
              Login
            </NavLink>
          )}
        </NavbarRight>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
