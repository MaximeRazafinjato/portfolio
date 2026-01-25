# Script de création des ressources Azure pour le Portfolio
# IMPORTANT: Remplacer <PASSWORD_SECURISE> par un mot de passe fort

$RESOURCE_GROUP = "rg-portfolio-maxime"
$LOCATION = "swedencentral"
$SQL_SERVER = "sql-portfolio-maxime"
$SQL_DB = "sqldb-portfolio"
$STORAGE_FRONTEND = "stportfoliomaxime"
$STORAGE_FUNCTIONS = "stportfoliofunc"
$FUNCTION_APP = "func-portfolio-maxime"

Write-Host "=== Enregistrement des providers Azure ===" -ForegroundColor Cyan
Write-Host "Enregistrement de Microsoft.Sql..." -ForegroundColor Gray
az provider register --namespace Microsoft.Sql
Write-Host "Enregistrement de Microsoft.Storage..." -ForegroundColor Gray
az provider register --namespace Microsoft.Storage
Write-Host "Enregistrement de Microsoft.Web..." -ForegroundColor Gray
az provider register --namespace Microsoft.Web

Write-Host "Attente de l'enregistrement des providers (peut prendre quelques minutes)..." -ForegroundColor Yellow
az provider show --namespace Microsoft.Sql --query "registrationState" -o tsv
az provider show --namespace Microsoft.Storage --query "registrationState" -o tsv
az provider show --namespace Microsoft.Web --query "registrationState" -o tsv

Write-Host "=== Création du Resource Group ===" -ForegroundColor Cyan
az group create `
  --name $RESOURCE_GROUP `
  --location $LOCATION `
  --tags projet=portfolio environnement=prod owner=maxime

Write-Host "=== Création du serveur SQL ===" -ForegroundColor Cyan
az sql server create `
  --name $SQL_SERVER `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --admin-user portfolioadmin `
  --admin-password "<REMOVED_SECRET>"

Write-Host "=== Création de la base de données SQL ===" -ForegroundColor Cyan
az sql db create `
  --name $SQL_DB `
  --resource-group $RESOURCE_GROUP `
  --server $SQL_SERVER `
  --service-objective Basic

Write-Host "=== Configuration du firewall SQL (Azure Services) ===" -ForegroundColor Cyan
az sql server firewall-rule create `
  --name AllowAzureServices `
  --resource-group $RESOURCE_GROUP `
  --server $SQL_SERVER `
  --start-ip-address 0.0.0.0 `
  --end-ip-address 0.0.0.0

Write-Host "=== Création du Storage Account (Frontend) ===" -ForegroundColor Cyan
az storage account create `
  --name $STORAGE_FRONTEND `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --sku Standard_LRS `
  --kind StorageV2

Write-Host "=== Activation du Static Website hosting ===" -ForegroundColor Cyan
az storage blob service-properties update `
  --account-name $STORAGE_FRONTEND `
  --static-website `
  --index-document index.html `
  --404-document index.html

Write-Host "=== Création du Storage Account (Functions) ===" -ForegroundColor Cyan
az storage account create `
  --name $STORAGE_FUNCTIONS `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --sku Standard_LRS

Write-Host "=== Création de la Function App ===" -ForegroundColor Cyan
az functionapp create `
  --name $FUNCTION_APP `
  --resource-group $RESOURCE_GROUP `
  --storage-account $STORAGE_FUNCTIONS `
  --consumption-plan-location $LOCATION `
  --runtime dotnet-isolated `
  --runtime-version 9 `
  --functions-version 4 `
  --os-type Linux

Write-Host "=== Récupération de l'URL du Static Website ===" -ForegroundColor Cyan
$STATIC_WEBSITE_URL = az storage account show `
  --name $STORAGE_FRONTEND `
  --resource-group $RESOURCE_GROUP `
  --query "primaryEndpoints.web" `
  --output tsv
$STATIC_WEBSITE_URL = $STATIC_WEBSITE_URL.TrimEnd('/')

Write-Host "=== Configuration des App Settings ===" -ForegroundColor Cyan
az functionapp config appsettings set `
  --name $FUNCTION_APP `
  --resource-group $RESOURCE_GROUP `
  --settings `
    "Auth0__Domain=maxime-razafinjato.eu.auth0.com" `
    "Auth0__Audience=https://cv-web-api" `
    "Cors__AllowedOrigins__0=$STATIC_WEBSITE_URL"

Write-Host "=== Configuration de la connection string SQL ===" -ForegroundColor Cyan
$SQL_PASSWORD = "<REMOVED_SECRET>"
az functionapp config appsettings set `
  --name $FUNCTION_APP `
  --resource-group $RESOURCE_GROUP `
  --settings "ConnectionStrings__PortfolioDb=Server=tcp:$SQL_SERVER.database.windows.net,1433;Database=$SQL_DB;User ID=portfolioadmin;Password=$SQL_PASSWORD;Encrypt=True;TrustServerCertificate=False;"

Write-Host ""
Write-Host "=== Ressources créées avec succès ===" -ForegroundColor Green
Write-Host ""
Write-Host "URLs importantes :" -ForegroundColor Yellow
Write-Host "  - Frontend : $STATIC_WEBSITE_URL"
Write-Host "  - Backend  : https://$FUNCTION_APP.azurewebsites.net/api"
Write-Host "  - SQL      : $SQL_SERVER.database.windows.net"
Write-Host ""
Write-Host "RAPPEL - Mettre à jour Auth0 Dashboard :" -ForegroundColor Yellow
Write-Host "  - Allowed Callback URLs  : $STATIC_WEBSITE_URL"
Write-Host "  - Allowed Logout URLs    : $STATIC_WEBSITE_URL"
Write-Host "  - Allowed Web Origins    : $STATIC_WEBSITE_URL"
