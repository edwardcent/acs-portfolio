export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
  sections: Section[];
  comingSoon?: boolean;
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
    slug: 'park-frequency',
    title: 'For Frequency Worldwide / Park',
    year: '2025–2026',
    category: 'Retail Hardware',
    description: 'Custom hardware, branded goods, and retail pop-up build for Park (formerly Frequency Worldwide), Atlanta.',
    image: 'park.png',
    sections: [],
  },
  {
    slug: 'grateful-dead-warner',
    title: 'T-Shirt Graphics for The Grateful Dead and Warner Music',
    year: '2021',
    category: 'Illustrations / Graphics',
    description: 'Licensed and original illustrations commissioned by Warner Music for official Grateful Dead merchandise.',
    image: 'warner.png',
    sections: [],
  },
  {
    slug: 'acs-marks',
    title: 'ACS Logo Marks',
    year: '2020–2026',
    category: 'Identity',
    description: 'Selected logo and identity marks from All Conditions Studio.',
    image: 'logos.png',
    sections: [],
  },
  {
    slug: 'makeway-catchall',
    title: 'Branded Catchall for MakeWay',
    year: '2021',
    category: 'Product Design',
    description: 'Concrete catchall hand-poured in Toronto for MakeWay. Featured in Complex Canada, December 2021.',
    image: 'makeway.png',
    sections: [],
  },
  {
    slug: 'bmw-grateful-dead',
    title: 'Upcycling Project',
    year: '2022',
    category: 'Graphics',
    description: 'Graphic tee collaboration merging BMW and Grateful Dead iconography.',
    image: 'bmw.png',
    sections: [],
  },
  {
    slug: 'studio-s-timetron',
    title: 'Concept Watch Design',
    year: '2024',
    category: 'Product Design, Prototyping',
    description: 'A love letter to the 1999 Seiko H Timetron.',
    image: 'watch.png',
    sections: [],
  },
  {
    slug: 'table-lighters',
    title: 'Table Lighters',
    year: '2023–2026',
    category: 'Product Design, Packaging, Branding',
    description: 'Aluminum table lighter — a tribute to the Braun T2 by Dieter Rams, machined in Toronto.',
    image: 'lighter.png',
    sections: [],
  },
];
