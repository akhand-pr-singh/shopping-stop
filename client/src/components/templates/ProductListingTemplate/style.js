import styled from 'styled-components';

export const TemplateContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

export const FiltersSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const FiltersTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const ClearFiltersButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const PriceRangeContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PriceInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 14px;
  width: 100px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const PriceSeparator = styled.span`
  color: #6c757d;
  font-weight: 500;
`;

export const ProductsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ResultsCount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const ResultsText = styled.span`
  font-size: 14px;
  color: #6c757d;
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SortLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const SortSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  flex-direction: column;
  gap: 16px;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 16px;
`;

export const EmptyStateIcon = styled.div`
  font-size: 64px;
  color: #6c757d;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const EmptyStateText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
  max-width: 400px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    border-color: #007bff;
    color: #007bff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: #007bff;
    border-color: #007bff;
    color: white;
  }
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: #6c757d;
  margin: 0 16px;
`;
