$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

# Use an installed Node first, otherwise reuse this app's bundled Node.
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
    $nodePath = $nodeCommand.Source
} else {
    $runtimePackage = Get-AppxPackage | Where-Object Name -Like '*CodexPrimaryRuntime*' | Sort-Object Version -Descending | Select-Object -First 1
    if ($runtimePackage) { $nodePath = Join-Path $runtimePackage.InstallLocation 'dependencies\node\bin\node.exe' }
}
if (!$nodePath -or !(Test-Path -LiteralPath $nodePath)) { throw 'Node.js is unavailable. Ask AJ to help install Node.js LTS before continuing.' }
$env:PATH = (Split-Path $nodePath) + ';' + $env:PATH

if (!(Test-Path -LiteralPath '.env.local')) { Copy-Item -LiteralPath '.env.example' -Destination '.env.local' }
if (!(Test-Path -LiteralPath 'node_modules\next\dist\bin\next')) {
    Write-Host 'Installing project dependencies in this folder. No global software is installed.'
    $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
    if ($npmCommand) {
        & $npmCommand.Source install --ignore-scripts
    } else {
        $bundledPnpm = Join-Path (Split-Path (Split-Path $nodePath)) 'node_modules\pnpm\bin\pnpm.cjs'
        if (!(Test-Path -LiteralPath $bundledPnpm)) { throw 'No package manager found. Ask AJ to help set up Node.js and npm.' }
        & $nodePath $bundledPnpm install --ignore-scripts --store-dir .pnpm-store --config.node-linker=hoisted --config.package-import-method=copy --config.enable-global-virtual-store=false
    }
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed. Share the error text with AJ; do not share your API key.' }
}
Write-Host 'Checking TypeScript...'
& $nodePath 'node_modules\typescript\bin\tsc' --noEmit
if ($LASTEXITCODE -ne 0) { throw 'TypeScript checks failed. Share the errors with AJ.' }
Write-Host 'Starting Coding with AJ at http://127.0.0.1:3001'
Write-Host 'Keep this window open. Press Ctrl+C to stop.'
& $nodePath 'node_modules\next\dist\bin\next' dev --hostname 127.0.0.1 --port 3001
