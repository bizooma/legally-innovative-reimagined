import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gantt-expanded-projects';

export function useExpandedProjects() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...expandedProjects]));
    } catch (error) {
      console.error('Failed to save expanded projects:', error);
    }
  }, [expandedProjects]);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  const expandAll = (projectIds: string[]) => {
    setExpandedProjects(new Set(projectIds));
  };

  const collapseAll = () => {
    setExpandedProjects(new Set());
  };

  return {
    expandedProjects,
    toggleProject,
    expandAll,
    collapseAll,
  };
}
