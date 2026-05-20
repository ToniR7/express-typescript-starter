import { name } from '@package'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'yaml'
import { openApiDocument } from '@/openapi/document'

const outputDir = join(process.cwd(), 'docs')

try {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  writeFileSync(join(outputDir, `${name}.openapi.json`), JSON.stringify(openApiDocument, null, 2), 'utf8')
  const yamlContent = yaml.stringify(openApiDocument)
  writeFileSync(join(outputDir, `${name}.openapi.yaml`), yamlContent, 'utf8')

  console.log('✅ OpenAPI documentation generated successfully!')
  console.log(`📁 Files saved to: ${outputDir}`)
  console.log(`📄 ${name}.openapi.json - JSON format`)
  console.log(`📄 ${name}.openapi.yaml - YAML format`)
} catch (error) {
  console.error('❌ Error generating OpenAPI documentation:', error)
  process.exit(1)
}
