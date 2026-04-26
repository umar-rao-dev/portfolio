import React from 'react';
import * as LucideIcons from 'lucide-react';

const LucideIcon = ({ name, size = 24, className = "" }) => {
  // If name is already a component (from constants), render it
  if (typeof name === 'function' || (typeof name === 'object' && name.$$typeof)) {
    const IconComponent = name;
    return <IconComponent size={size} className={className} />;
  }

  // If name is a string, look it up in LucideIcons
  const IconComponent = LucideIcons[name] || LucideIcons.Code;
  return <IconComponent size={size} className={className} />;
};

export default LucideIcon;
