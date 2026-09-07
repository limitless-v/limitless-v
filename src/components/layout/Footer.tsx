import React from 'react';
import { FOOTER_DATA } from '../../data/portfolioData.ts';

export const Footer: React.FC = () => {
  return (
    <footer>
      <span>{FOOTER_DATA.copyright}</span>
      <span>{FOOTER_DATA.tech}</span>
    </footer>
  );
};
