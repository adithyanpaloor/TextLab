export interface TextVariation {
  id: string;
  name: string;
  description: string;
  example: string;
  isMonospace?: boolean;
  convert: (text: string) => string;
}

function mapLines(text: string, transform: (line: string) => string): string {
  return text.split('\n').map(transform).join('\n');
}

function getWords(text: string): string[] {
  const words = text
    .replace(/[^\w\s\u00C0-\u024F'-]/g, ' ')
    .trim()
    .split(/\s+/);
  return words.filter(Boolean);
}

export const variations: TextVariation[] = [
  {
    id: 'uppercase',
    name: 'UPPERCASE',
    description: 'Converts all letters to uppercase',
    example: 'MODERN STREET LIGHTING SOLUTIONS',
    convert: (text: string) => text.toUpperCase(),
  },
  {
    id: 'lowercase',
    name: 'lowercase',
    description: 'Converts all letters to lowercase',
    example: 'modern street lighting solutions',
    convert: (text: string) => text.toLowerCase(),
  },
  {
    id: 'titlecase',
    name: 'Title Case',
    description: 'Capitalizes the principal words',
    example: 'Modern Street Lighting Solutions',
    convert: (text: string) => {
      return mapLines(text, (line) => {
        return line.replace(/\b([a-zA-Z\u00C0-\u024F])([a-zA-Z\u00C0-\u024F']*)/g, (_, p1, p2) => {
          return p1.toUpperCase() + p2.toLowerCase();
        });
      });
    },
  },
  {
    id: 'sentencecase',
    name: 'Sentence case',
    description: 'Capitalizes the first letter of each sentence',
    example: 'Modern street lighting solutions',
    convert: (text: string) => {
      if (!text) return '';
      return mapLines(text, (line) => {
        if (!line.trim()) return line;
        const lower = line.toLowerCase();
        return lower.replace(/(^\s*|[.!?]\s*)([a-z\u00C0-\u024F])/g, (_, p1, p2) => {
          return p1 + p2.toUpperCase();
        });
      });
    },
  },
  {
    id: 'firstlettercapital',
    name: 'First Letter Capital',
    description: 'Capitalizes the first letter of every word',
    example: 'Modern Street Lighting Solutions',
    convert: (text: string) => {
      return mapLines(text, (line) => {
        return line.replace(/(\b[a-zA-Z\u00C0-\u024F])/g, (match) => match.toUpperCase());
      });
    },
  },
  {
    id: 'alternatingcase',
    name: 'aLtErNaTiNg CaSe',
    description: 'Alternates uppercase and lowercase letters',
    example: 'MoDeRn StReEt LiGhTiNg SoLuTiOnS',
    convert: (text: string) => {
      let isUpper = false;
      return text
        .split('')
        .map((char) => {
          if (/[a-zA-Z\u00C0-\u024F]/.test(char)) {
            const res = isUpper ? char.toUpperCase() : char.toLowerCase();
            isUpper = !isUpper;
            return res;
          }
          return char;
        })
        .join('');
    },
  },
  {
    id: 'pascalcase',
    name: 'PascalCase',
    description: 'Capitalizes each word without spaces',
    example: 'ModernStreetLightingSolutions',
    isMonospace: true,
    convert: (text: string) => {
      return mapLines(text, (line) => {
        const words = getWords(line);
        return words
          .map((w) => {
            const cleaned = w.replace(/[^\w\u00C0-\u024F]/g, '');
            if (!cleaned) return '';
            return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
          })
          .join('');
      });
    },
  },
  {
    id: 'camelcase',
    name: 'camelCase',
    description: 'First word lowercase, rest capitalized',
    example: 'modernStreetLightingSolutions',
    isMonospace: true,
    convert: (text: string) => {
      return mapLines(text, (line) => {
        const words = getWords(line);
        return words
          .map((w, index) => {
            const cleaned = w.replace(/[^\w\u00C0-\u024F]/g, '');
            if (!cleaned) return '';
            if (index === 0) return cleaned.toLowerCase();
            return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
          })
          .join('');
      });
    },
  },
  {
    id: 'snakecase',
    name: 'snake_case',
    description: 'Lowercase words joined by underscores',
    example: 'modern_street_lighting_solutions',
    isMonospace: true,
    convert: (text: string) => {
      return mapLines(text, (line) => {
        const words = getWords(line);
        return words
          .map((w) => w.replace(/[^\w\u00C0-\u024F]/g, '').toLowerCase())
          .filter(Boolean)
          .join('_');
      });
    },
  },
  {
    id: 'kebabcase',
    name: 'kebab-case',
    description: 'Lowercase words joined by hyphens',
    example: 'modern-street-lighting-solutions',
    isMonospace: true,
    convert: (text: string) => {
      return mapLines(text, (line) => {
        const words = getWords(line);
        return words
          .map((w) => w.replace(/[^\w\u00C0-\u024F]/g, '').toLowerCase())
          .filter(Boolean)
          .join('-');
      });
    },
  },
  {
    id: 'dotcase',
    name: 'dot.case',
    description: 'Lowercase words joined by dots',
    example: 'modern.street.lighting.solutions',
    isMonospace: true,
    convert: (text: string) => {
      return mapLines(text, (line) => {
        const words = getWords(line);
        return words
          .map((w) => w.replace(/[^\w\u00C0-\u024F]/g, '').toLowerCase())
          .filter(Boolean)
          .join('.');
      });
    },
  },
  {
    id: 'constantcase',
    name: 'CONSTANT_CASE',
    description: 'Uppercase words joined by underscores',
    example: 'MODERN_STREET_LIGHTING_SOLUTIONS',
    isMonospace: true,
    convert: (text: string) => {
      return mapLines(text, (line) => {
        const words = getWords(line);
        return words
          .map((w) => w.replace(/[^\w\u00C0-\u024F]/g, '').toUpperCase())
          .filter(Boolean)
          .join('_');
      });
    },
  },
];

export function computeTextStats(text: string) {
  if (!text) return { characters: 0, words: 0 };
  return {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
  };
}

export const SAMPLE_PRESETS = [
  'Modern Street Lighting Solutions 2026!',
  'Organic Cold-Pressed Botanical Elixir - 250ml',
  'Design with precision. Build with clarity.',
];
