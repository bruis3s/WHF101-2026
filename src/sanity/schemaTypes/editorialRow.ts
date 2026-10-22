// Sanity schema type for Framer-like dynamic editorial rows

export const editorialRow = {
  name: 'editorialRow',
  title: 'Editorial Layout Row',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Row Reference / Title',
      type: 'string',
      description: 'e.g. 02 / JOINERY & TECTONIC ASSEMBLY'
    },
    {
      name: 'gap',
      title: 'Row Spacing / Gap',
      type: 'string',
      options: {
        list: [
          { title: 'Flush (0px)', value: '0px' },
          { title: 'Tight (8px)', value: '8px' },
          { title: 'Editorial (16px)', value: '16px' },
          { title: 'Generous (24px)', value: '24px' },
          { title: 'Wide (32px)', value: '32px' },
          { title: 'Space Between (Justified)', value: 'between' }
        ],
        layout: 'radio'
      },
      initialValue: '16px'
    },
    {
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top (flex-start)', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom (flex-end)', value: 'bottom' },
          { title: 'Stretch to Full Height', value: 'stretch' }
        ],
        layout: 'radio'
      },
      initialValue: 'top'
    },
    {
      name: 'paddingTop',
      title: 'Top Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'None (0px)', value: '0' },
          { title: 'Standard (40px)', value: '40px' },
          { title: 'Spacious (80px)', value: '80px' }
        ]
      },
      initialValue: '0'
    },
    {
      name: 'paddingBottom',
      title: 'Bottom Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'None (0px)', value: '0' },
          { title: 'Standard (40px)', value: '40px' },
          { title: 'Spacious (80px)', value: '80px' }
        ]
      },
      initialValue: '80px'
    },
    {
      name: 'columns',
      title: 'Columns & Media Elements',
      type: 'array',
      description: 'Add 1, 2, or 3 columns. Width percentages adjust proportions.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Asset / Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'widthPercent',
              title: 'Width Percentage (20% – 100%)',
              type: 'number',
              description: 'e.g. 38 for left column, 62 for right column',
              validation: (Rule: any) => Rule.min(10).max(100)
            },
            {
              name: 'fit',
              title: 'Image Fit',
              type: 'string',
              options: {
                list: [
                  { title: 'Cover (Fill container)', value: 'cover' },
                  { title: 'Contain (Show entire photo)', value: 'contain' },
                  { title: 'Natural (Intrinsic proportion)', value: 'natural' }
                ]
              },
              initialValue: 'cover'
            },
            {
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: '4 / 3 Standard', value: '4/3' },
                  { title: '3 / 4 Vertical Portrait', value: '3/4' },
                  { title: '16 / 9 Cinematic Wide', value: '16/9' },
                  { title: '1 / 1 Square', value: '1/1' },
                  { title: 'Auto / Original', value: 'auto' }
                ]
              },
              initialValue: '4/3'
            },
            {
              name: 'figureNumber',
              title: 'Figure Notation',
              type: 'string',
              description: 'e.g. FIG 02.1'
            },
            {
              name: 'caption',
              title: 'Architectural Caption',
              type: 'text',
              rows: 2
            },
            {
              name: 'material',
              title: 'Material Specification',
              type: 'string',
              description: 'e.g. Cast Acrylic & 316 Stainless'
            }
          ]
        }
      ]
    }
  ]
};
