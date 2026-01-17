import productDomains from '@/assets/product-domains.png';
import productDomails from '@/assets/product-domails.png';
import productLoanahub from '@/assets/product-loanahub.png';

export type ProductStatus = 'live' | 'beta' | 'experimental';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  status: ProductStatus;
  icon: string;
  category: string;
  features?: string[];
  techFocus?: string;
  github?: string;
  image?: string;
}

export const products: Product[] = [
  {
    id: 'domains',
    name: 'Domains Doofs',
    tagline: 'Domain management and discovery tool simplified for developers who ship frequent prototypes.',
    description: 'Get a free subdomain and manage your DNS records. Perfect for side projects, staging environments, and experiments.',
    url: 'https://domains.doofs.tech',
    status: 'live',
    icon: '🌐',
    category: 'INFRA',
    features: ['Free subdomains', 'Full DNS control', 'Instant provisioning'],
    techFocus: 'DNS Management',
    github: 'https://github.com/doofs',
    image: productDomains,
  },
  {
    id: 'do-mails',
    name: 'Do-Mails',
    tagline: 'Protect your privacy with instant disposable email addresses. End-to-end encrypted and temporary by design.',
    description: 'Straightforward email service built for developers who want reliability without complexity.',
    url: 'https://www.do-mails.space',
    status: 'beta',
    icon: '✉️',
    category: 'UTILITY',
    features: ['Developer-first API', 'No-nonsense pricing', 'Fast delivery'],
    techFocus: 'Email Infrastructure',
    image: productDomails,
  },
  {
    id: 'loan-a-hub',
    name: 'Loan A Hub',
    tagline: 'Manage professional loan agreements and track applications with ease. Private, secure, and governed by law.',
    description: 'A clean interface to manage personal loans, track payments, and stay organized.',
    url: 'https://www.loan-a-hub.doofio.site',
    status: 'experimental',
    icon: '💰',
    category: 'FINTECH',
    features: ['P2P Lending', 'Family Loans', 'Tracking'],
    techFocus: 'Finance Tools',
    image: productLoanahub,
  },
];

// Lab/Experimental projects
export interface LabProject {
  id: string;
  name: string;
  description: string;
  status: 'idea' | 'building' | 'paused';
  eta?: string;
}

export const labProjects: LabProject[] = [
  {
    id: 'doofs-cli',
    name: 'Doofs CLI',
    description: 'A unified command-line interface to manage all Doofs products from your terminal.',
    status: 'idea',
    eta: 'Q2 2025',
  },
  {
    id: 'doofs-analytics',
    name: 'Simple Analytics',
    description: 'Privacy-first analytics that developers actually want. No cookies, no tracking, just insights.',
    status: 'building',
    eta: 'Q1 2025',
  },
  {
    id: 'doofs-auth',
    name: 'Auth Kit',
    description: 'Drop-in authentication for side projects. OAuth, magic links, and API keys in minutes.',
    status: 'idea',
  },
  {
    id: 'doofs-status',
    name: 'Status Pages',
    description: 'Beautiful, minimal status pages for your services. Real-time monitoring included.',
    status: 'paused',
  },
];
