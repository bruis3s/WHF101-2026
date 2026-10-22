export type RowLayoutType = 'single' | 'two-column' | 'three-column' | 'modular-bench';

export type VerticalAlignment = 'top' | 'center' | 'bottom' | 'stretch';
export type HorizontalAlignment = 'left' | 'center' | 'right' | 'space-between';
export type ImageFitMode = 'cover' | 'contain' | 'natural';
export type RowGapSize = '0px' | '8px' | '16px' | '24px' | '32px' | '48px' | '64px' | 'between';

export interface MediaColumn {
  id: string;
  widthPercent: number; // e.g. 35 or 65 (auto-scales to 100 on desktop)
  alignSelf?: 'start' | 'center' | 'end';
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. '16/9', '4/3', '3/4', '1/1', 'auto'
  fit?: ImageFitMode;
  maxHeight?: string;
  caption?: string;
  figureNumber?: string;
  metadata?: {
    material?: string;
    dimension?: string;
    scale?: string;
  };
}

export interface EditorialRow {
  id: string;
  type: RowLayoutType;
  title?: string;
  gap: RowGapSize;
  verticalAlign: VerticalAlignment;
  horizontalAlign?: HorizontalAlignment;
  paddingTop?: '0' | '40px' | '80px' | '120px';
  paddingBottom?: '0' | '40px' | '80px' | '120px';
  columns: MediaColumn[];
}

export interface ModularBenchItem {
  id: string;
  title: string;
  code: string;
  type: 'arc-segment' | 'acrylic-fin' | 'stone' | 'bracket' | 'diagram';
  src: string;
  initialX: number; // in pixels relative to center
  initialY: number;
  initialRotation: number;
  width: number;
  height: number;
  elevation: number;
}

export interface CaseStudyData {
  id: string;
  code: string; // e.g. WHF101-2026
  title: string;
  subtitle: string;
  discipline: string[];
  year: string;
  location: string;
  status: string;
  client: string;
  materials: string[];
  dimension: string;
  description: string[];
  specs: {
    label: string;
    value: string;
  }[];
  rows: EditorialRow[];
  modularBench: {
    heading: string;
    subheading: string;
    description: string;
    items: ModularBenchItem[];
  };
}
