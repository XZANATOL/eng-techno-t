import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	target: 'serverless',
	output: "standalone"
}

export default withPayload(nextConfig)
