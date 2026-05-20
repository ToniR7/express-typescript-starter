import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'

type KeyVaultParams = {
  vaultName: string
  key: string
}

export const getSecret = async ({ vaultName, key }: KeyVaultParams): Promise<string | undefined> => {
  const credential = new DefaultAzureCredential({
    requiredEnvVars: ['AZURE_TOKEN_CREDENTIALS'],
  })

  const url = `https://${vaultName}.vault.azure.net`

  const client = new SecretClient(url, credential)
  const { value } = await client.getSecret(key)

  return value
}
