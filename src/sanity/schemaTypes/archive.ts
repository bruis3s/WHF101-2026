// Sanity schema type for Archive — objects/materials from projects

export const archive = {
  name: 'archive',
  title: 'Archive',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Object / Item Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2
    },
    {
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'e.g. Cast Acrylic, 316 Stainless, Marble'
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string'
    },
    {
      name: 'linkedProject',
      title: 'Linked Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Which project does this object appear in?'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'material',
      media: 'image'
    }
  }
};
