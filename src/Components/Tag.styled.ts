import styled from 'styled-components';

export const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #bbdefb;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: #bbdefb;
    border-color: #90caf9;
  }
`;

export const TagText = styled.span`
  white-space: nowrap;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background: #1976d2;
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3);
  }
`; 