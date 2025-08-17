import React from 'react';
import {
  CartContainer,
  CartHeader,
  CartTitle,
  CloseButton,
  CartContent,
  CartItems,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  ItemActions,
  QuantityButton,
  Quantity,
  RemoveButton,
  EmptyCart,
  EmptyCartIcon,
  EmptyCartText,
  CartFooter,
  CartTotal,
  TotalLabel,
  TotalAmount,
  CheckoutButton,
  Overlay
} from './style';

const Cart = ({
  isOpen = false,
  cartItems = [],
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  className = ''
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity?.(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    onRemoveItem?.(itemId);
  };

  const handleCheckout = () => {
    onCheckout?.();
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <CartContainer isOpen={isOpen} className={className}>
        <CartHeader>
          <CartTitle>Shopping Cart</CartTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </CartHeader>

        <CartContent>
          {cartItems.length === 0 ? (
            <EmptyCart>
              <EmptyCartIcon>🛒</EmptyCartIcon>
              <EmptyCartText>Your cart is empty</EmptyCartText>
            </EmptyCart>
          ) : (
            <CartItems>
              {cartItems.map((item) => (
                <CartItem key={item._id}>
                  <ItemImage
                    src={item.images?.[0] || '/placeholder-product.jpg'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  </ItemDetails>
                  <ItemActions>
                    <QuantityButton
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    >
                      +
                    </QuantityButton>
                    <RemoveButton
                      onClick={() => handleRemoveItem(item._id)}
                      title="Remove item"
                    >
                      🗑️
                    </RemoveButton>
                  </ItemActions>
                </CartItem>
              ))}
            </CartItems>
          )}
        </CartContent>

        {cartItems.length > 0 && (
          <CartFooter>
            <CartTotal>
              <TotalLabel>Total:</TotalLabel>
              <TotalAmount>${calculateTotal().toFixed(2)}</TotalAmount>
            </CartTotal>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </CartFooter>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;
