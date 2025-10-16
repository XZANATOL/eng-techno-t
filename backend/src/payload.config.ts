import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { Podcasts } from './collections/Podcasts'
import { Audios } from './collections/Audios'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: "http://localhost:3001",
  collections: [Podcasts, Media, Audios, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    payloadCloudPlugin(),
    // vercelBlobStorage({
    //   enabled: true, // Optional, defaults to true
    //   // Specify which collections should use Vercel Blob
    //   collections: {
    //     media: true,
    //     audios: true
    //   },
    //   // Token provided by Vercel once Blob storage is added to your Vercel project
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    // }),
  ],
})
