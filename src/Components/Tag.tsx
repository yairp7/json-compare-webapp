import React from 'react';
import {
  TagContainer,
  TagText,
  RemoveButton
} from './Tag.styled';

interface TagProps {
  text: string;
  onRemove: (text: string) => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <TagContainer>
      <TagText>{text}</TagText>
      <RemoveButton
        onClick={() => onRemove(text)}
        aria-label={`Remove ${text}`}
        title={`Remove ${text}`}
      >
        ×
      </RemoveButton>
    </TagContainer>
  );
};

export default Tag; 