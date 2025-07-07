import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const ExcludedFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-height: 48px;
  padding: 0.5rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background: #fafafa;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #1976d2;
    background: white;
  }
`;

export const TagInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  min-width: 120px;
  flex: 1;

  &::placeholder {
    color: #999;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const JsonInputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 400px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const JsonInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const JsonInputLabel = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ValidationStatus = styled.div<{ isValid: boolean; hasContent: boolean; }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ isValid, hasContent }) => {
    if (!hasContent) return '#999';
    return isValid ? '#4caf50' : '#f44336';
  }};
`;

export const ValidationIcon = styled.span<{ isValid: boolean; hasContent: boolean; }>`
  font-size: 0.875rem;
  color: ${({ isValid, hasContent }) => {
    if (!hasContent) return '#999';
    return isValid ? '#4caf50' : '#f44336';
  }};
`;

export const JsonTextarea = styled.textarea<{ isValid: boolean; hasError: boolean; }>`
  flex: 1;
  min-height: 350px;
  padding: 1rem;
  border: 1px solid ${({ hasError, isValid }) => {
    if (hasError) return '#f44336';
    if (isValid) return '#4caf50';
    return '#ddd';
  }};
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  background: ${({ hasError }) => hasError ? '#fff5f5' : '#fafafa'};
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#f44336' : '#1976d2'};
    background: white;
  }

  &::placeholder {
    color: #999;
  }
`;

export const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  padding: 0.5rem;
  background: #fff5f5;
  border-radius: 4px;
  border-left: 3px solid #f44336;
`;

export const ErrorLocation = styled.span`
  font-weight: 600;
  color: #d32f2f;
`;

export const CompareButton = styled.button`
  align-self: center;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
`;

export const ResultsTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
`;

export const ResultsContent = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #333;
`;

export const FormatButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;

  &:hover {
    background: #e0e0e0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TemplateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
`;

export const TemplateControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const TemplateSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.875rem;
  min-width: 200px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

export const TemplateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.875rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

export const TemplateButton = styled.button`
  padding: 0.5rem 1rem;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1565c0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d32f2f;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const TemplateInfo = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.5rem;
`;

export const TemplateActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const ModalPrimaryButton = styled(ModalButton)`
  background: #1976d2;
  color: white;

  &:hover {
    background: #1565c0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ModalSecondaryButton = styled(ModalButton)`
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;

  &:hover {
    background: #e0e0e0;
  }
`; 