import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${props => props.type === 'sale' ? '#dc3545' : '#28a745'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CurrentPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: #6c757d;
  text-decoration: line-through;
`;

export const Discount = styled.span`
  font-size: 12px;
  color: #dc3545;
  font-weight: 600;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

export const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

export const Star = styled.span`
  color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
  font-size: 14px;
`;

export const RatingText = styled.span`
  font-size: 12px;
  color: #6c757d;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
