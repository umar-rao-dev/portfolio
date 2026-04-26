import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Constants from '../utils/constants';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data');
    let baseData = Constants;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Data Validation/Correction Layer
        const validated = { ...parsed };

        // Ensure HERO_SUBTITLE is a string
        if (validated.HERO_SUBTITLE && typeof validated.HERO_SUBTITLE !== 'string') {
          validated.HERO_SUBTITLE = String(validated.HERO_SUBTITLE);
        }

        // Ensure TITLES is an array of strings
        if (validated.TITLES) {
          if (!Array.isArray(validated.TITLES)) {
            validated.TITLES = ["PHP | LARAVEL DEVELOPER"];
          } else {
            validated.TITLES = validated.TITLES.map(t => typeof t === 'string' ? t : String(t));
          }
        }

        // Ensure ABOUT_TEXT is an array of strings
        if (validated.ABOUT_TEXT) {
          if (!Array.isArray(validated.ABOUT_TEXT)) {
            validated.ABOUT_TEXT = Constants.ABOUT_TEXT;
          } else {
            validated.ABOUT_TEXT = validated.ABOUT_TEXT.map(p => typeof p === 'string' ? p : String(p));
          }
        }

        // Ensure SKILLS is an array
        if (validated.SKILLS && !Array.isArray(validated.SKILLS)) {
          validated.SKILLS = Constants.SKILLS;
        }

        return { ...Constants, ...validated };
      } catch (e) {
        return Constants;
      }
    }
    return Constants;
  });

  useEffect(() => {
    // Sanitize data for storage (convert components to names)
    const storageData = { ...data };
    if (storageData.SKILLS) {
      storageData.SKILLS = storageData.SKILLS.map(skill => ({
        ...skill,
        icon: typeof skill.icon === 'string' ? skill.icon : (skill.icon.name || 'Code')
      }));
    }

    localStorage.setItem('portfolio_data', JSON.stringify(storageData));
    // Apply theme colors to CSS variables if they exist
    if (data.THEME) {
      document.documentElement.style.setProperty('--primary', data.THEME.primary);
      document.documentElement.style.setProperty('--secondary', data.THEME.secondary);
    }
  }, [data]);

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};
