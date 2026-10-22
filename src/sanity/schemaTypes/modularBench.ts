// Sanity schema type for interactive modular workbench section

export const modularBench = {
  name: 'modularBench',
  title: 'Interactive Modular Canvas',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: '06 / MODULAR RING ARTIFACTS'
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      initialValue: 'TACTILE INTERACTION SANDBOX'
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'items',
      title: 'Draggable Modular Parts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Part Name', type: 'string' },
            { name: 'code', title: 'Part Code (e.g. MOD-ARC-A)', type: 'string' },
            { name: 'image', title: 'Isolated Component Image', type: 'image' },
            { name: 'initialX', title: 'Initial X (px offset)', type: 'number' },
            { name: 'initialY', title: 'Initial Y (px offset)', type: 'number' },
            { name: 'initialRotation', title: 'Initial Rotation (deg)', type: 'number' },
            { name: 'width', title: 'Display Width (px)', type: 'number', initialValue: 200 }
          ]
        }
      ]
    }
  ]
};
