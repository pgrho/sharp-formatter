cd /d %~dp0
SET OUTPUT=packages
SET OPTIONS=-OutputDirectory %OUTPUT%
del /q %OUTPUT%
mkdir %OUTPUT%
nuget pack ..\src\Shipwreck.SharpFormatter\Shipwreck.SharpFormatter.nuspec %OPTIONS%
