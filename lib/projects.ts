export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  description: string;
  sections: Section[];
};

export type Section = {
  type: 'hero' | 'text-image' | 'image-grid' | 'full-image' | 'text-only';
  heading?: string;
  body?: string[];
  images?: { src: string; alt: string; caption?: string }[];
  layout?: 'left' | 'right' | 'center';
};

export const projects: Project[] = [
  {
    slug: 'table-lighters',
    title: 'Table Lighters',
    year: '2023–2026',
    category: 'Product Design',
    description: 'Aluminum table lighter — a tribute to the Braun T2 by Dieter Rams, machined in Toronto.',
    sections: [],
  },
  {
    slug: 'makeway-catchall',
    title: 'Branded Catchall for MakeWay',
    year: '2021',
    category: 'Product Design / Manufacturing',
    description: 'Concrete catchall hand-poured in Toronto for MakeWay. Featured in Complex Canada, December 2021.',
    sections: [],
  },
  {
    slug: 'grateful-dead-warner',
    title: 'T-Shirt Graphics for The Grateful Dead & Warner Music',
    year: '2021',
    category: 'Illustration / Graphics',
    description: 'Licensed and original illustrations commissioned by Warner Music for official Grateful Dead merchandise.',
    sections: [],
  },
  {
    slug: 'park-frequency',
    title: 'Park / Frequency Worldwide',
    year: '2024–Present',
    category: 'Hardware / Brand',
    description: 'Custom hardware, branded goods, and retail pop-up build for Park (formerly Frequency Worldwide), Atlanta.',
    sections: [],
  },
  {
    slug: 'studio-s-timetron',
    title: 'Studio S-Timetron Watch',
    year: '2024',
    category: 'Product Design',
    description: 'Concept watch design for Studio S.',
    sections: [],
  },
  {
    slug: 'acs-marks',
    title: 'ACS Selected Logos',
    year: '2020–Present',
    category: 'Identity',
    description: 'Selected logo and identity marks from All Conditions Studio.',
    sections: [],
  },
  {
    slug: 'bmw-grateful-dead',
    title: 'BMW × Grateful Dead Tee Drop',
    year: '2022',
    category: 'Graphics',
    description: 'Graphic tee collaboration between BMW and the Grateful Dead estate.',
    sections: [],
  },
  {
    slug: 'counterfeit-tech-pack',
    title: 'Counterfeit Studio Tech Pack',
    year: '2022',
    category: 'Production Design',
    description: 'Technical production package for Counterfeit Studio.',
    sections: [],
  },
];
