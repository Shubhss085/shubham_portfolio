@echo off
set "JSON={\"site_id\":\"489d9fb2-d87b-4676-b115-6d9a19c163d9\",\"body\":{\"build_settings\":{\"repo_url\":\"https://github.com/Shubhss085/Shubhss085.github.io\",\"repo_branch\":\"master\",\"dir\":\"\",\"cmd\":\"\",\"env\":{},\"provider\":\"github\"}}}"
npx.cmd netlify api updateSite --data "%JSON%"
