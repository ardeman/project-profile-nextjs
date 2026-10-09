/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Repository instructions are maintained in AGENTS.md.
  agentRules: false,
  images: {
    unoptimized: true,
  },
  basePath: '',
}

export default nextConfig
