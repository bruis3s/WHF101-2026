// Sanity schema type for Case Studies / Projects

export const project = {
  name: 'project',
  title: 'Case Studies / Projects',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'code',
      title: 'Project ID / Ref Code (e.g. WHF101-2026)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'Residential' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Installation', value: 'Installation' },
          { title: 'Interior', value: 'Interior' },
          { title: 'Cultural', value: 'Cultural' },
          { title: 'Research', value: 'Research' },
          { title: 'Product', value: 'Product' },
        ],
        layout: 'radio'
      },
      initialValue: 'Residential'
    },
    {
      name: 'show',
      title: 'Show on Werks',
      description: 'Toggle to show or hide this project on the public Werks page.',
      type: 'boolean',
      initialValue: true
    },
    // ── Cover / Thumbnail ─────────────────────────────────────────────────────
    {
      name: 'coverImage',
      title: 'Cover Image (Werks Thumbnail)',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'coverImageUrl',
      title: 'Local Cover Image URL',
      type: 'string',
      description: 'Local upload URL (e.g. /uploads/...)'
    },
    // ── Metadata ──────────────────────────────────────────────────────────────
    {
      name: 'subtitle',
      title: 'Core Architectural Statement',
      type: 'text',
      rows: 2
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      initialValue: '2026'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Jakarta, Indonesia'
    },
    {
      name: 'client',
      title: 'Client / Commission',
      type: 'string'
    },
    {
      name: 'discipline',
      title: 'Disciplines',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'description',
      title: 'Narrative Paragraphs',
      type: 'array',
      of: [{ type: 'text' }]
    },
    {
      name: 'specs',
      title: 'Technical Specifications Table',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Specification Label' },
            { name: 'value', type: 'string', title: 'Specification Value' }
          ]
        }
      ]
    },
    // ── Case Study Builder Layout ─────────────────────────────────────────────
    {
      name: 'layoutRows',
      title: 'Case Study Page Layout (Editorial Rows)',
      type: 'array',
      description: 'Add and configure custom editorial rows. Each row can have 1–3 media columns.',
      of: [
        { type: 'editorialRow' }
      ]
    },
    {
      name: 'modularBenchSection',
      title: 'Interactive Modular Workbench (Optional)',
      type: 'modularBench'
    },
    {
      name: 'builderLayout',
      title: 'Visual Builder Layout (JSON)',
      type: 'text',
      description: 'Serialized layout tree from the visual no-code builder.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'code',
      media: 'coverImage'
    }
  }
};
