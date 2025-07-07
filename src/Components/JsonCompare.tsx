import React, { useState, useRef, useCallback, useEffect } from 'react';
import Tag from './Tag';
import {
  Container,
  Section,
  SectionTitle,
  ExcludedFieldsContainer,
  TagInputContainer,
  TagInput,
  TagsContainer,
  JsonInputsContainer,
  JsonInputSection,
  JsonInputLabel,
  JsonTextarea,
  CompareButton,
  ResultsContainer,
  ResultsTitle,
  ResultsContent,
  ValidationStatus,
  ValidationIcon,
  ErrorMessage,
  ErrorLocation,
  FormatButton,
  TemplateContainer,
  TemplateControls,
  TemplateSelect,
  TemplateButton,
  DeleteButton,
  TemplateInfo,
  TemplateActions,
  Modal,
  ModalContent,
  ModalTitle,
  ModalInput,
  ModalActions,
  ModalPrimaryButton,
  ModalSecondaryButton
} from './JsonCompare.styled';
import { compareJson, type DeepCompareResult } from '../utils/jsonCompare';
import { validateJson, formatJson, type JsonValidationResult } from '../utils/jsonValidation';
import {
  saveTemplate,
  loadAllTemplates,
  loadTemplate,
  deleteTemplate,
  updateTemplate,
  type Template
} from '../utils/templateManager';

const JsonCompare: React.FC = () => {
  const [json1, setJson1] = useState<string>('');
  const [json2, setJson2] = useState<string>('');
  const [excludedFields, setExcludedFields] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [results, setResults] = useState<DeepCompareResult | null>(null);
  const [validation1, setValidation1] = useState<JsonValidationResult>({ isValid: true });
  const [validation2, setValidation2] = useState<JsonValidationResult>({ isValid: true });
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Template state
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [templateName, setTemplateName] = useState<string>('');
  const [showSaveTemplate, setShowSaveTemplate] = useState<boolean>(false);

  const addExcludedField = (field: string) => {
    const trimmedField = field.trim();
    if (trimmedField && !excludedFields.includes(trimmedField)) {
      setExcludedFields([...excludedFields, trimmedField]);
      setTagInput('');
    }
  };

  const removeExcludedField = (field: string) => {
    setExcludedFields(excludedFields.filter(f => f !== field));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addExcludedField(tagInput);
    }
  };

  const handleTagInputBlur = () => {
    if (tagInput.trim()) {
      addExcludedField(tagInput);
    }
  };

  const validateJson1 = useCallback((value: string) => {
    setValidation1(validateJson(value));
  }, []);

  const validateJson2 = useCallback((value: string) => {
    setValidation2(validateJson(value));
  }, []);

  const handleJson1Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson1(value);
    validateJson1(value);
  };

  const handleJson2Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson2(value);
    validateJson2(value);
  };

  const handleFormatJson1 = () => {
    const formatted = formatJson(json1);
    setJson1(formatted);
    validateJson1(formatted);
  };

  const handleFormatJson2 = () => {
    const formatted = formatJson(json2);
    setJson2(formatted);
    validateJson2(formatted);
  };

  const handleCompare = () => {
    try {
      setResults(compareJson(json1, json2, excludedFields));
    } catch (error) {
      setResults({
        isEqual: false,
        differences: [`JSON parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`],
        excludedFields
      });
    }
  };

  // Load templates on component mount
  useEffect(() => {
    setTemplates(loadAllTemplates());
  }, []);

  // Template management functions
  const handleSaveTemplate = () => {
    if (templateName.trim() && excludedFields.length > 0) {
      const newTemplate = saveTemplate(templateName, excludedFields);
      setTemplates(loadAllTemplates());
      setSelectedTemplateId(newTemplate.id);
      setExcludedFields(newTemplate.excludedFields);
      setTemplateName('');
      setShowSaveTemplate(false);
    }
  };

  const handleLoadTemplate = (templateId: string) => {
    if (templateId) {
      const template = loadTemplate(templateId);
      if (template) {
        setExcludedFields(template.excludedFields);
        setSelectedTemplateId(templateId);
      }
    } else {
      setExcludedFields([]);
      setSelectedTemplateId('');
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (deleteTemplate(templateId)) {
      setTemplates(loadAllTemplates());
      if (selectedTemplateId === templateId) {
        setSelectedTemplateId('');
      }
    }
  };

  const handleUpdateTemplate = () => {
    if (selectedTemplateId && templateName.trim()) {
      const updatedTemplate = updateTemplate(selectedTemplateId, templateName, excludedFields);
      if (updatedTemplate) {
        setTemplates(loadAllTemplates());
        setTemplateName('');
        setShowSaveTemplate(false);
      }
    }
  };

  const openSaveModal = () => {
    setTemplateName('');
    setShowSaveTemplate(true);
  };

  const openUpdateModal = () => {
    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
    if (selectedTemplate) {
      setTemplateName(selectedTemplate.name);
      setShowSaveTemplate(true);
    }
  };

  const closeModal = () => {
    setShowSaveTemplate(false);
    setTemplateName('');
  };

  const canCompare = json1.trim() && json2.trim() && validation1.isValid && validation2.isValid;

  const getValidationIcon = (isValid: boolean, hasContent: boolean) => {
    if (!hasContent) return '○';
    return isValid ? '✓' : '✗';
  };

  const getValidationText = (isValid: boolean, hasContent: boolean) => {
    if (!hasContent) return 'Empty';
    return isValid ? 'Valid JSON' : 'Invalid JSON';
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Excluded Fields</SectionTitle>
        <ExcludedFieldsContainer>
          <TagInputContainer>
            <TagsContainer>
              {excludedFields.map(field => (
                <Tag
                  key={field}
                  text={field}
                  onRemove={removeExcludedField}
                />
              ))}
            </TagsContainer>
            <TagInput
              ref={tagInputRef}
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onBlur={handleTagInputBlur}
              placeholder="Type field name and press Enter..."
            />
          </TagInputContainer>
        </ExcludedFieldsContainer>

        {/* Template Management */}
        <TemplateContainer>
          {selectedTemplateId && (
            <TemplateInfo>
              {templates.find(t => t.id === selectedTemplateId) && (
                <span>

                </span>
              )}
            </TemplateInfo>
          )}
          <TemplateControls>
            <TemplateSelect
              value={selectedTemplateId}
              onChange={(e) => handleLoadTemplate(e.target.value)}
            >
              <option value="">Select a template...</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.excludedFields.length} fields - {new Date(template.createdAt).toLocaleDateString()})
                </option>
              ))}
            </TemplateSelect>

            <TemplateActions>
              {excludedFields.length > 0 && (
                <TemplateButton
                  onClick={selectedTemplateId ? openUpdateModal : openSaveModal}
                >
                  {selectedTemplateId ? 'Update' : 'Save'}
                </TemplateButton>
              )}

              {selectedTemplateId && (
                <DeleteButton
                  onClick={() => handleDeleteTemplate(selectedTemplateId)}
                >
                  Delete
                </DeleteButton>
              )}
            </TemplateActions>
          </TemplateControls>
        </TemplateContainer>
      </Section>

      <Section>
        <SectionTitle>JSON Comparison</SectionTitle>
        <JsonInputsContainer>
          <JsonInputSection>
            <JsonInputLabel htmlFor="json1">
              First JSON
              <ValidationStatus isValid={validation1.isValid} hasContent={!!json1.trim()}>
                <ValidationIcon isValid={validation1.isValid} hasContent={!!json1.trim()}>
                  {getValidationIcon(validation1.isValid, !!json1.trim())}
                </ValidationIcon>
                {getValidationText(validation1.isValid, !!json1.trim())}
              </ValidationStatus>
              <FormatButton
                onClick={handleFormatJson1}
                disabled={!json1.trim() || !validation1.isValid}
                title="Format JSON"
              >
                Format
              </FormatButton>
            </JsonInputLabel>
            <JsonTextarea
              id="json1"
              value={json1}
              onChange={handleJson1Change}
              placeholder="Paste your first JSON here..."
              isValid={validation1.isValid}
              hasError={!validation1.isValid && !!json1.trim()}
            />
            {!validation1.isValid && validation1.error && (
              <ErrorMessage>
                <ErrorLocation>
                  {validation1.errorLine && validation1.errorColumn
                    ? `Line ${validation1.errorLine}, Column ${validation1.errorColumn}: `
                    : ''
                  }
                </ErrorLocation>
                {validation1.error}
              </ErrorMessage>
            )}
          </JsonInputSection>

          <JsonInputSection>
            <JsonInputLabel htmlFor="json2">
              Second JSON
              <ValidationStatus isValid={validation2.isValid} hasContent={!!json2.trim()}>
                <ValidationIcon isValid={validation2.isValid} hasContent={!!json2.trim()}>
                  {getValidationIcon(validation2.isValid, !!json2.trim())}
                </ValidationIcon>
                {getValidationText(validation2.isValid, !!json2.trim())}
              </ValidationStatus>
              <FormatButton
                onClick={handleFormatJson2}
                disabled={!json2.trim() || !validation2.isValid}
                title="Format JSON"
              >
                Format
              </FormatButton>
            </JsonInputLabel>
            <JsonTextarea
              id="json2"
              value={json2}
              onChange={handleJson2Change}
              placeholder="Paste your second JSON here..."
              isValid={validation2.isValid}
              hasError={!validation2.isValid && !!json2.trim()}
            />
            {!validation2.isValid && validation2.error && (
              <ErrorMessage>
                <ErrorLocation>
                  {validation2.errorLine && validation2.errorColumn
                    ? `Line ${validation2.errorLine}, Column ${validation2.errorColumn}: `
                    : ''
                  }
                </ErrorLocation>
                {validation2.error}
              </ErrorMessage>
            )}
          </JsonInputSection>
        </JsonInputsContainer>

        <CompareButton
          onClick={handleCompare}
          disabled={!canCompare}
        >
          Compare JSON
        </CompareButton>
      </Section>

      {results && (
        <ResultsContainer>
          <ResultsTitle>
            Comparison Results
            {excludedFields.length > 0 && (
              <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'normal' }}>
                {' '}(Excluded fields: {excludedFields.join(', ')})
              </span>
            )}
          </ResultsTitle>
          <ResultsContent>
            {results.isEqual ? (
              '✅ The JSON objects are equal (excluding specified fields)'
            ) : (
              results.differences.length > 0 ? (
                `❌ Found ${results.differences.length} difference(s):\n\n${results.differences.join('\n')}`
              ) : (
                '❌ Error occurred during comparison'
              )
            )}
          </ResultsContent>
        </ResultsContainer>
      )}

      {/* Template Save/Update Modal */}
      {showSaveTemplate && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {selectedTemplateId ? 'Update Template' : 'Save Template'}
            </ModalTitle>
            <ModalInput
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && templateName.trim()) {
                  selectedTemplateId ? handleUpdateTemplate() : handleSaveTemplate();
                }
              }}
              autoFocus
            />
            <ModalActions>
              <ModalSecondaryButton onClick={closeModal}>
                Cancel
              </ModalSecondaryButton>
              <ModalPrimaryButton
                onClick={selectedTemplateId ? handleUpdateTemplate : handleSaveTemplate}
                disabled={!templateName.trim()}
              >
                {selectedTemplateId ? 'Update' : 'Save'}
              </ModalPrimaryButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default JsonCompare; 