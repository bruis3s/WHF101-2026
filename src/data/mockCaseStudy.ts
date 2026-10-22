import { CaseStudyData } from '@/types/caseStudy';

export const mockCaseStudy: CaseStudyData = {
  id: 'whf-101',
  code: 'WHF101-2026',
  title: 'CIRCULAR MODULAR BENCH & DISPLAY SYSTEM',
  subtitle: 'An adaptable radial seating and retail exhibition architecture engineered in perforated aluminum and monolithic acrylic fins.',
  discipline: ['Spatial Architecture', 'Furniture System', 'Exhibition Design'],
  year: '2026',
  location: 'Tokyo, Japan',
  status: 'Completed / Installed',
  client: 'Werks Galleria & Studio',
  materials: [
    '6061-T6 Perforated Aluminum (4.0mm)',
    'Cast Acrylic Monolith PMMA (35mm)',
    '316 Stainless Steel Pin Bushings',
    'Natural Uncut Granite Boulders'
  ],
  dimension: 'Ø 7,200 mm Outer Ring / 450 mm Height',
  description: [
    'Conceived as a dialogue between industrial precision and geological weight, the Circular Modular System is organized into twelve interconnecting arc benches that form a 360-degree perimeter within the central showroom.',
    'Each arc segment balances on high-clarity cast acrylic vertical fins, allowing the perforated aluminum plates to float above the warm terracotta concrete plane. At the center of the ring, raw granite boulders act as an anchoring datum.'
  ],
  specs: [
    { label: 'PROJECT ID', value: 'WHF101-2026' },
    { label: 'TYPOLOGY', value: 'Modular Radial System' },
    { label: 'CURVATURE', value: 'R 3,600 mm (Internal Axis)' },
    { label: 'MODULE COUNT', value: '12 Interlocking Segments' },
    { label: 'WEIGHT / SEGMENT', value: '28.4 kg (Excluding Ballast)' },
    { label: 'JOINERY', value: 'M12 Shear-Tension Dual Pin' }
  ],
  rows: [
    {
      id: 'row-hero-overview',
      type: 'single',
      title: '01 / OVERVIEW & GALLERY CONTEXT',
      gap: '0px',
      verticalAlign: 'center',
      horizontalAlign: 'center',
      paddingTop: '40px',
      paddingBottom: '80px',
      columns: [
        {
          id: 'col-hero-main',
          widthPercent: 100,
          src: '/images/projects/haf-bench/bench-overview.jpg',
          alt: 'Curved modular perforated aluminum bench in gallery with acrylic supports',
          aspectRatio: '16/9',
          fit: 'cover',
          caption: 'Fig. 01.0 — Perimeter segment installed at Werks Galleria showroom. Monolithic acrylic fins cast refracted shadows across the terracotta concrete slab.',
          figureNumber: 'FIG 01.0',
          metadata: {
            material: 'Perforated Aluminum & Acrylic',
            dimension: '2,400 x 600 x 450 mm',
            scale: '1:1 Site Installation'
          }
        }
      ]
    },
    {
      id: 'row-asymmetric-detail-study',
      type: 'two-column',
      title: '02 / JOINERY & TECTONIC ASSEMBLY',
      gap: '16px',
      verticalAlign: 'top',
      paddingTop: '0',
      paddingBottom: '80px',
      columns: [
        {
          id: 'col-detail-leg',
          widthPercent: 38,
          src: '/images/projects/haf-bench/acrylic-detail.jpg',
          alt: 'Macro detail of acrylic fin and stainless steel connector pins',
          aspectRatio: '3/4',
          fit: 'cover',
          caption: 'Fig. 02.1 — Detail of 35mm clear PMMA blade coupled with twin M12 stainless fastening pins and chamfered aluminum extrusion edge.',
          figureNumber: 'FIG 02.1',
          metadata: {
            material: 'Cast PMMA & 316 Stainless',
            dimension: '450 x 120 x 35 mm',
            scale: 'Detail 1:2'
          }
        },
        {
          id: 'col-detail-context',
          widthPercent: 62,
          src: '/images/projects/haf-bench/bench-overview.jpg',
          alt: 'Perspective of connected curved bench modules',
          aspectRatio: '4/3',
          fit: 'cover',
          caption: 'Fig. 02.2 — Continuous curvature established through sequential segment interlocking. The perforations create optical moiré patterns under directional daylight.',
          figureNumber: 'FIG 02.2',
          metadata: {
            material: 'Continuous Array',
            dimension: 'R 3,600 mm Centerline'
          }
        }
      ]
    },
    {
      id: 'row-drawing-installation-pair',
      type: 'two-column',
      title: '03 / AXONOMETRIC SPECIFICATION & SITE CORE',
      gap: '24px',
      verticalAlign: 'center',
      paddingTop: '0',
      paddingBottom: '80px',
      columns: [
        {
          id: 'col-cad-sheet',
          widthPercent: 48,
          src: '/images/projects/haf-bench/modular-sketch.svg',
          alt: 'Architectural isometric assembly sheet drawing',
          aspectRatio: '4/5',
          fit: 'contain',
          caption: 'Fig. 03.1 — Studio fabrication drawing HW-101 / EXP-04B indicating exploded acrylic fin alignment and central radial datum.',
          figureNumber: 'FIG 03.1',
          metadata: {
            material: 'Vector CAD / A1 Sheet',
            scale: 'Exploded Axonometric'
          }
        },
        {
          id: 'col-circle-installation',
          widthPercent: 52,
          src: '/images/projects/haf-bench/circular-installation.jpg',
          alt: 'Elevated view of complete circular modular ring bench surrounding rock core',
          aspectRatio: '4/3',
          fit: 'cover',
          caption: 'Fig. 03.2 — Elevated vantage showing the 12-segment ring assembly encircling local granite core, acting as an exhibition nexus.',
          figureNumber: 'FIG 03.2',
          metadata: {
            material: 'Full Assembly with Rock Core',
            dimension: 'Ø 7,200 mm'
          }
        }
      ]
    },
    {
      id: 'row-cad-radial-plan',
      type: 'single',
      title: '04 / GEOMETRIC AXIS & SEGMENT DIVISION',
      gap: '0px',
      verticalAlign: 'center',
      horizontalAlign: 'center',
      paddingTop: '0',
      paddingBottom: '80px',
      columns: [
        {
          id: 'col-plan-ring',
          widthPercent: 100,
          src: '/images/projects/haf-bench/modular-ring-plan.svg',
          alt: 'Black silhouette CAD ring drawing showing 12 radial bench segments',
          aspectRatio: '1/1',
          maxHeight: '620px',
          fit: 'contain',
          caption: 'Fig. 04.0 — Plan silhouette showing the 30-degree arc division of each bench module, acrylic radial support vectors, and central rock void.',
          figureNumber: 'FIG 04.0',
          metadata: {
            scale: '1:50 @ A1',
            dimension: 'Ø 7,200 Outer / Ø 4,000 Inner'
          }
        }
      ]
    },
    {
      id: 'row-interior-oak-wall',
      type: 'two-column',
      title: '05 / MATERIAL INTERACTION & DISPLAY EXTENSION',
      gap: '24px',
      verticalAlign: 'bottom',
      paddingTop: '0',
      paddingBottom: '80px',
      columns: [
        {
          id: 'col-wall-display',
          widthPercent: 64,
          src: '/images/projects/haf-bench/display-wall.jpg',
          alt: 'Oak timber showroom wall with cantilevered acrylic display brackets',
          aspectRatio: '4/3',
          fit: 'cover',
          caption: 'Fig. 05.1 — Extension of the acrylic architectural language to perimeter retail walls: cantilevered PMMA shelves inset into solid Japanese white oak.',
          figureNumber: 'FIG 05.1',
          metadata: {
            material: 'White Oak & Acrylic',
            dimension: 'Wall Height 3,200 mm'
          }
        },
        {
          id: 'col-wall-crop-detail',
          widthPercent: 36,
          src: '/images/projects/haf-bench/acrylic-detail.jpg',
          alt: 'Macro sun beam shadow study on terracotta floor',
          aspectRatio: '3/4',
          fit: 'cover',
          caption: 'Fig. 05.2 — Refraction study demonstrating light transmission through acrylic supports during afternoon solar transit.',
          figureNumber: 'FIG 05.2',
          metadata: {
            scale: 'Solar Study at 15:30'
          }
        }
      ]
    }
  ],
  modularBench: {
    heading: '06 / MODULAR RING ARTIFACTS',
    subheading: 'TACTILE INTERACTION SANDBOX',
    description: 'The circular bench is composed of autonomous modular components. Drag, reposition, or disassemble the circular ring below to inspect the geometric components and materials.',
    items: [
      {
        id: 'item-arc-01',
        title: 'Curved Perforated Bench Arc 01',
        code: 'MOD-ARC-A',
        type: 'arc-segment',
        src: '/images/modular/bench-segment.svg',
        initialX: -140,
        initialY: -70,
        initialRotation: -25,
        width: 260,
        height: 150,
        elevation: 2
      },
      {
        id: 'item-arc-02',
        title: 'Curved Perforated Bench Arc 02',
        code: 'MOD-ARC-B',
        type: 'arc-segment',
        src: '/images/modular/bench-segment.svg',
        initialX: 130,
        initialY: -70,
        initialRotation: 25,
        width: 260,
        height: 150,
        elevation: 2
      },
      {
        id: 'item-fin-left',
        title: 'Cast Acrylic Support Fin (West)',
        code: 'FIN-PMMA-W',
        type: 'acrylic-fin',
        src: '/images/modular/acrylic-fin.svg',
        initialX: -180,
        initialY: 60,
        initialRotation: -8,
        width: 130,
        height: 200,
        elevation: 4
      },
      {
        id: 'item-fin-right',
        title: 'Cast Acrylic Support Fin (East)',
        code: 'FIN-PMMA-E',
        type: 'acrylic-fin',
        src: '/images/modular/acrylic-fin.svg',
        initialX: 180,
        initialY: 60,
        initialRotation: 8,
        width: 130,
        height: 200,
        elevation: 4
      },
      {
        id: 'item-granite-core',
        title: 'Dry-Stack Granite Core',
        code: 'GEO-CORE-01',
        type: 'stone',
        src: '/images/modular/stone-element.svg',
        initialX: 0,
        initialY: 10,
        initialRotation: 0,
        width: 180,
        height: 160,
        elevation: 1
      },
      {
        id: 'item-bracket-hardware',
        title: 'M12 Shear-Tension Dual Bracket',
        code: 'HW-M12-BUSH',
        type: 'bracket',
        src: '/images/modular/bracket-connector.svg',
        initialX: 0,
        initialY: 130,
        initialRotation: 0,
        width: 120,
        height: 120,
        elevation: 5
      }
    ]
  }
};
