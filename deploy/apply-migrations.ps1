# Script pour appliquer les migrations EF Core sur Azure SQL
# IMPORTANT: Remplacer <PASSWORD> par le mot de passe SQL

$SQL_SERVER = "sql-portfolio-maxime"
$SQL_DB = "sqldb-portfolio"
$SQL_USER = "portfolioadmin"
$SQL_PASSWORD = "<PASSWORD>"

$CONNECTION_STRING = "Server=tcp:$SQL_SERVER.database.windows.net,1433;Database=$SQL_DB;User ID=$SQL_USER;Password=$SQL_PASSWORD;Encrypt=True;TrustServerCertificate=False;"

Push-Location portfolio-backend

Write-Host "=== Option 1 : Générer le script SQL ===" -ForegroundColor Cyan
dotnet ef migrations script `
  --project Portfolio.Infrastructure `
  --startup-project Portfolio.Functions `
  --output ../deploy/migrations.sql

Write-Host "Script SQL généré dans deploy/migrations.sql" -ForegroundColor Green
Write-Host ""

Write-Host "=== Option 2 : Appliquer directement les migrations ===" -ForegroundColor Cyan
Write-Host "Exécutez la commande suivante pour appliquer :"
Write-Host ""
Write-Host "dotnet ef database update ``" -ForegroundColor Yellow
Write-Host "  --project Portfolio.Infrastructure ``" -ForegroundColor Yellow
Write-Host "  --startup-project Portfolio.Functions ``" -ForegroundColor Yellow
Write-Host "  --connection `"$CONNECTION_STRING`"" -ForegroundColor Yellow

Pop-Location
