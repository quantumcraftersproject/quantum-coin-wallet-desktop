$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'

$packageJson = Get-Content -Path 'package.json'

$packageJson = $packageJson.Replace('[wallet-version]', [System.Environment]::GetEnvironmentVariable('RELEASE_VERSION'))

Set-Content -Path 'package.json' -Value $packageJson
