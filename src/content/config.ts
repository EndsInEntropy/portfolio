import { defineCollection, z } from 'astro:content';

const image = z.object({
  src: z.string().optional(),
  alt: z.string(),
  caption: z.string().optional(),
});

const textBlock = z.object({
  type: z.literal('text'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.array(z.string()),
});

const imageBlock = z.object({
  type: z.literal('image'),
  figure: z.string().optional(),
  full: z.boolean().optional(),
  image: image,
});

const galleryBlock = z.object({
  type: z.literal('gallery'),
  figure: z.string().optional(),
  heading: z.string().optional(),
  images: z.array(image).min(1),
});

const quoteBlock = z.object({
  type: z.literal('quote'),
  text: z.string(),
  attribution: z.string().optional(),
});

const statsBlock = z.object({
  type: z.literal('stats'),
  heading: z.string().optional(),
  items: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ).min(1),
});

const sideBySideBlock = z.object({
  type: z.literal('sidebyside'),
  left: z.object({ heading: z.string().optional(), body: z.array(z.string()) }),
  right: z.object({ heading: z.string().optional(), body: z.array(z.string()) }),
});

const sectionBlock = z.discriminatedUnion('type', [
  textBlock,
  imageBlock,
  galleryBlock,
  quoteBlock,
  statsBlock,
  sideBySideBlock,
]);

const caseStudies = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    client: z.string(),
    role: z.string(),
    year: z.string(),
    timeline: z.string().optional(),
    team: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    coverImage: image,
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    sample: z.boolean().default(false),
    order: z.number().default(0),
    sections: z.array(sectionBlock).default([]),
  }),
});

export const collections = { 'case-studies': caseStudies };
