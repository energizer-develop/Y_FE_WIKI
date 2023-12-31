import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'components/NavigationContainer';
import { media } from 'styles/media';

function NavigationGallery() {
  const categories = [
    { id: 1, name: '사진첩1' },
    { id: 2, name: '사진첩2' },
    { id: 3, name: '사진첩3' },
    { id: 4, name: '사진첩4' },
    { id: 5, name: '사진첩5' },
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  return (
    <Container>
      <StyledLogoText>사진첩</StyledLogoText>
      <StyledGalleryCategories>
        {categories.map((category) => {
          const url = `/gallery?category=${category.name}`;
          return (
            <StyledLink key={category.id} to={url}>
              <span
                className={
                  category.name === selectedCategory ? 'selected_category' : ''
                }
              >
                {category.name}
              </span>
            </StyledLink>
          );
        })}
      </StyledGalleryCategories>
    </Container>
  );
}

const StyledLogoText = styled.span`
  margin: 1.875rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  cursor: default;
  ${media.tablet_680(`
  font-size: 1.3rem;
`)}
`;

const StyledGalleryCategories = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    border-bottom: 2px solid #e2e8f0;
    cursor: pointer;
  }
  .selected_category {
    font-weight: 700;
    border-bottom: 2px solid #e2e8f0;
  }
`;

export default NavigationGallery;
