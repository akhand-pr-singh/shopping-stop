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
  cartItemLoading = { id: null, action: null },
  className = ''
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price * item.quantity);
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
              {cartItems.map((item) => {
                const isLoading = cartItemLoading.id === item._id;
                return (
                  <CartItem
                    key={item._id}
                    style={{
                      opacity: isLoading ? 0.5 : 1,
                      pointerEvents: isLoading ? 'none' : 'auto',
                      position: 'relative'
                    }}
                  >
                    {isLoading && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          fontSize: 16
                        }}
                        aria-label="Loading"
                      >
                        <span className="loader" /> {/* You can use a spinner here */}
                        Loading...
                      </span>
                    )}
                    <ItemImage
                      src={item.product?.images?.[0]?.url || '/placeholder-product.jpg'}
                      alt={item.product?.name}
                      onError={(e) => {
                        e.target.src = item.product?.images?.[0]?.url || '/placeholder-product.jpg';
                      }}
                    />
                    <ItemDetails>
                      <ItemName>{item.product?.name}</ItemName>
                      <ItemPrice>${Number(item.product?.price?.toFixed(2))}</ItemPrice>
                    </ItemDetails>
                    <ItemActions>
                      <QuantityButton
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isLoading}
                      >
                        -
                      </QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        +
                      </QuantityButton>
                      <RemoveButton
                        onClick={() => handleRemoveItem(item._id)}
                        title="Remove item"
                        disabled={isLoading}
                      >
                        🗑️
                      </RemoveButton>
                    </ItemActions>
                  </CartItem>
                );
              })}
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
