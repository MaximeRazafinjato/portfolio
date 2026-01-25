# Script optionnel pour ajouter Azure CDN

$RESOURCE_GROUP = "rg-portfolio-maxime"
$CDN_PROFILE = "cdn-portfolio-maxime"
$STORAGE_FRONTEND = "stportfoliomaxime"

Write-Host "=== Création du profil CDN ===" -ForegroundColor Cyan
az cdn profile create `
  --name $CDN_PROFILE `
  --resource-group $RESOURCE_GROUP `
  --sku Standard_Microsoft

Write-Host "=== Création de l'endpoint CDN ===" -ForegroundColor Cyan
az cdn endpoint create `
  --name portfolio-maxime `
  --profile-name $CDN_PROFILE `
  --resource-group $RESOURCE_GROUP `
  --origin "$STORAGE_FRONTEND.z6.web.core.windows.net" `
  --origin-host-header "$STORAGE_FRONTEND.z6.web.core.windows.net"

Write-Host ""
Write-Host "=== CDN configuré ===" -ForegroundColor Green
Write-Host "URL CDN : https://portfolio-maxime.azureedge.net"
