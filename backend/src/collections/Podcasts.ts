import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { v4 as uuidv4 } from 'uuid';

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: "text",
      name: "id",
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
      defaultValue: ({user, locale, req}) => (uuidv4()),
    },
    {
      type: "text",
      name: "title",
      required: true
    },
    {
      type: "date",
      name: "date",
      required: true
    },
    {
      type: "text",
      name: "author",
      required: true
    },
    {
      type: "array",
      name: "members",
      required: true,
      fields: [
        {
          type: "text",
          name: "member",
          required: true
        },
      ]
    },
    {
      type: "text",
      name: "duration",
      required: true
    },
    {
      type: "upload",
      relationTo: "media",
      name: "image",
      required: true
    },
    {
      type: "upload",
      relationTo: "audios",
      name: "audio",
      required: true
    },
    {
      type: "richText",
      name: "rich-content",
      required: false,
      editor: lexicalEditor({
        features: ({defaultFeatures}) => {
          return [...defaultFeatures.filter((feature) => feature.key !== 'upload' && feature.key !== 'relationship')]
        }
      })
    },
  ],
}
