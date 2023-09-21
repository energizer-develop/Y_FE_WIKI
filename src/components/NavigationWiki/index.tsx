import styled from 'styled-components';
import { Container } from 'components/NavigationContainer';
import { useNavigate, useLocation } from 'react-router-dom';

interface props {
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isChange: boolean;
}

function NavigationWiki({ setIsChanged, isChange }: props) {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const selectedCategory = searchParams.get('category');

  const initialCompanyInfo = [
    { id: 1, text: '회사 내규', pathName: 'companyRule' },
    { id: 2, text: '팀 소개', pathName: 'companyTeam' },
    { id: 3, text: '조직도', pathName: 'companyOrganization' },
  ];

  const initialProjectInfo = [
    { id: 1, text: '진행중인 프로젝트', pathName: 'projects' },
    { id: 2, text: '예정된 프로젝트', pathName: 'projectsExpected' },
    { id: 3, text: '완료된 프로젝트', pathName: 'projectsFinished' },
  ];

  const initialOnBoardingInfo = [
    { id: 1, text: '신입사원 필독서', pathName: 'onBoardingDocs' },
    { id: 2, text: '온보딩 문서', pathName: 'onBoardingSubjects' },
  ];

  const companyList = initialCompanyInfo.map((company) => (
    <li
      key={company.id}
      className={
        company.pathName === selectedCategory ? 'selected_category' : ''
      }
      onClick={() => {
        navigate(`/wiki?category=${company.pathName}`);
        setIsChanged(!isChange);
      }}
    >
      {company.text}
    </li>
  ));

  const projectList = initialProjectInfo.map((project) => (
    <li
      key={project.id}
      className={
        project.pathName === selectedCategory ? 'selected_category' : ''
      }
      onClick={() => {
        navigate(`/wiki?category=${project.pathName}`);
        setIsChanged(!isChange);
      }}
    >
      {project.text}
    </li>
  ));

  const onBoardingList = initialOnBoardingInfo.map((onBoarding) => (
    <li
      key={onBoarding.id}
      className={
        onBoarding.pathName === selectedCategory ? 'selected_category' : ''
      }
      onClick={() => {
        navigate(`/wiki?category=${onBoarding.pathName}`);
        setIsChanged(!isChange);
      }}
    >
      {onBoarding.text}
    </li>
  ));

  return (
    <Container>
      <CategoryContainer>
        <CategoryUl>
          <h1>회사생활</h1>
          {companyList}
        </CategoryUl>
        <CategoryUl>
          <h1>프로젝트</h1>
          {projectList}
        </CategoryUl>
        <CategoryUl>
          <h1>온보딩</h1>
          {onBoardingList}
        </CategoryUl>
      </CategoryContainer>
    </Container>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;

`;

const CategoryUl = styled.ul`
  padding: 0;
  color: white;
  margin-top: 2rem;

  li {
    list-style: none;
    margin: 1rem 0 1rem 1rem;
    cursor: default;
  }

  .selected_category {
    font-weight: 700;
    border-bottom: 2px solid #e2e8f0;
  }
  li:hover {
    cursor: pointer;
  }
`;

export default NavigationWiki;

