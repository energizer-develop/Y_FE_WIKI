import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { Timestamp } from 'firebase/firestore';
import { wikiDelete } from 'apis/Wiki/index'
import { media } from 'styles/media';

interface loadingProps {
  data: any;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function WikiContent({ data, setIsEdit }: loadingProps) {
  const time = data?.writeTime as Timestamp;
  const documentWritedTime = time?.toDate().toString();

  return (
    <StyledWikiContentContainer>
      {data === undefined ? (
        <StyledWikiNotExist>
          <h1>아직 작성된 글이 없습니다.</h1>
          <button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            + 글 작성하기
          </button>
        </StyledWikiNotExist>
      ) : (
        <div>
          <StyledButtonContainer>
            <div>
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                수정하기
              </button>
              <button
                onClick={() => {
                  wikiDelete(data?.subject);
                }}
              >
                삭제하기
              </button>
            </div>
          </StyledButtonContainer>
          <p>최종 수정 시간: {documentWritedTime}</p>
          <br />
          <MDEditor.Markdown
            className="markdownViewer"
            source={data?.content}
          />
        </div>
      )}
    </StyledWikiContentContainer>
  );
}
export default WikiContent;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 1rem;
  }
`;

const StyledWikiContentContainer = styled.div`
  height: 100%;
`;


const StyledWikiNotExist = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  button {
    color: #3584f4;
    font-size: 1rem;
    text-align: right;
    cursor: pointer;
  }

  ${media.desktop_lg(`
    font-size: 1.25rem;
  `)}
  ${media.tablet(`
    font-size: 1.125rem;
  `)}
  ${media.tablet_680(`
    font-size: 1rem;
  `)}
  ${media.tablet_625(`
    font-size: 0.875rem;
  `)}
  ${media.mobile_430(`
    font-size: 0.75rem;
  `)}
`;