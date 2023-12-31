import MDEditor from '@uiw/react-md-editor';
import { create, update } from 'apis/Wiki';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { media } from 'styles/media';

interface createProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  data: DocumentData | undefined;
}

function WikiCreate({ setIsEdit, selectedCategory, data }: createProps) {
  const isCreate = data === undefined;
  const [textValue, setTextValue] = useState(isCreate ? '' : data.content);
  const handleSetValue = (text: string | undefined) => {
    if (text) {
      setTextValue(text);
    } else {
      setTextValue('')
    }
  };

  const handleWikiContent = async () => {
    const trimmedTextValue = textValue.trim()
    if (textValue === '' || trimmedTextValue.length === 0) {
      alert('빈 내용은 등록하실 수 없습니다.');
      return;
    }
    if (isCreate) {
      await create(selectedCategory, textValue);
    } else {
      await update(selectedCategory, textValue);
    }
    setIsEdit(false);
  };

  return (
    <StyledTextareaContainer>
      <StyledButtonContainer>
        <button onClick={handleWikiContent}>
          {isCreate ? '등록하기' : '수정하기'}
        </button>
      </StyledButtonContainer>
      <MDEditor
        placeholder="등록할 내용을 입력해주세요."
        value={textValue}
        onChange={(event) => {
          handleSetValue(event);
        }}
        id="markdownEditor"
      />
    </StyledTextareaContainer>
  );
}

export default WikiCreate;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 1rem 0 1rem 1rem;
    border: 1px solid rgb(226, 232, 240);
    padding: 0.5rem;
    border-radius: 1rem;
  }

  button:hover {
    background-color: rgb(237, 242, 247);
  }
`;

const StyledTextareaContainer = styled.div`
  margin: 2rem;
  position: relative;
  height: 50vw;

  #markdownEditor {
    height: 100% !important;
  }

  ${media.desktop_lg(`
    width: 35rem;
    height: 40rem; 
  `)}
  ${media.tablet(`
    width: 30rem;
    height: 35rem;
  `)}
  ${media.tablet_680(`
    width: 25rem;
    height: 35rem;
  `)}
  ${media.tablet_625(`
    width: 20rem;
    height: 30rem;
  `)}
  ${media.mobile_430(`
    width: 15rem;
    height: 25rem;
  `)}
`;
