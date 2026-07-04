@echo off
setlocal
set "JSON={\"site_id\":\"489d9fb2-d87b-4676-b115-6d9a19c163d9\",\"body\":{\"custom_domain\":\"shubham-ramtekkar-portfolio.com\"}}"
npx.cmd netlify api updateSite --data "%JSON%"
