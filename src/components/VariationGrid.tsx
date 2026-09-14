import React from 'react';
import { variations } from '../utils/textConverter';
import { VariationCard } from './VariationCard';

interface VariationGridProps {
  inputText: string;
}

export const VariationGrid: React.FC<VariationGridProps> = ({ inputText }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {variations.map((variation) => (
        <VariationCard key={variation.id} variation={variation} inputText={inputText} />
      ))}
    </div>
  );
};
