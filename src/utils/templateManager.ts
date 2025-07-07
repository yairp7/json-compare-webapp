export interface Template {
  id: string;
  name: string;
  excludedFields: string[];
  createdAt: number;
}

const STORAGE_KEY = 'json-compare-templates';

export const saveTemplate = (name: string, excludedFields: string[]): Template => {
  const templates = loadAllTemplates();

  const newTemplate: Template = {
    id: Date.now().toString(),
    name: name.trim(),
    excludedFields: [...excludedFields],
    createdAt: Date.now()
  };

  templates.push(newTemplate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));

  return newTemplate;
};

export const loadAllTemplates = (): Template[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

export const loadTemplate = (id: string): Template | null => {
  const templates = loadAllTemplates();
  return templates.find(template => template.id === id) || null;
};

export const deleteTemplate = (id: string): boolean => {
  const templates = loadAllTemplates();
  const filteredTemplates = templates.filter(template => template.id !== id);

  if (filteredTemplates.length !== templates.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTemplates));
    return true;
  }

  return false;
};

export const updateTemplate = (id: string, name: string, excludedFields: string[]): Template | null => {
  const templates = loadAllTemplates();
  const templateIndex = templates.findIndex(template => template.id === id);

  if (templateIndex === -1) {
    return null;
  }

  const updatedTemplate: Template = {
    ...templates[templateIndex],
    name: name.trim(),
    excludedFields: [...excludedFields]
  };

  templates[templateIndex] = updatedTemplate;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));

  return updatedTemplate;
}; 