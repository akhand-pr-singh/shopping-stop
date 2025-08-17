import React from 'react';
import Button from '../../atoms/Button';
import {
  Card,
  ImageContainer,
  ProductImage,
  Badge,
  Content,
  Title,
  PriceContainer,
  CurrentPrice,
  OriginalPrice,
  RatingContainer,
  Stars,
  Star,
  RatingText,
  Actions
} from './style';

const ProductCard = ({
  product,
  onAddToCart,
  onViewDetails,
  className = ''
}) => {
  const {
    _id,
    name,
    price,
    originalPrice,
    images,
    rating,
    numReviews,
    discount,
    badge
  } = product;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      );
    }
    return stars;
  };

  const discountPercentage = originalPrice && price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  return (
    <Card className={className} onClick={onViewDetails}>
      <ImageContainer>
        <ProductImage 
          src={images?.[0] || '/placeholder-product.jpg'} 
          alt={name}
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
        {badge && <Badge type={badge.type}>{badge.text}</Badge>}
        {discountPercentage > 0 && (
          <Badge type="sale">{discountPercentage}% OFF</Badge>
        )}
      </ImageContainer>
      
      <Content>
        <Title>{name}</Title>
        
        <PriceContainer>
          <CurrentPrice>${price?.toFixed(2)}</CurrentPrice>
          {originalPrice && originalPrice > price && (
            <OriginalPrice>${originalPrice.toFixed(2)}</OriginalPrice>
          )}
        </PriceContainer>

        <RatingContainer>
          <Stars>
            {renderStars(rating || 0)}
          </Stars>
          <RatingText>({numReviews || 0})</RatingText>
        </RatingContainer>

        <Actions onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="primary" 
            size="small"
            onClick={() => onAddToCart(product)}
            style={{ flex: 1 }}
          >
            Add to Cart
          </Button>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProductCard;
