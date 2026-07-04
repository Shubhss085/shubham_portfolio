import json, urllib.request, os, subprocess

# Get token via netlify api
result = subprocess.run(['npx.cmd', 'netlify', 'api', 'listSites'], 
                       capture_output=True, text=True, shell=True)
sites = json.loads(result.stdout)
site = [s for s in sites if s['id'] == '489d9fb2-d87b-4676-b115-6d9a19c163d9'][0]

print("Current site config:")
print("  name:", site['name'])
print("  custom_domain:", site.get('custom_domain'))
print("  build_settings repo:", site.get('build_settings', {}).get('repo_url'))

# The site is already on Netlify. For auto-deploy from GitHub:
# The user needs to connect it in the Netlify Dashboard UI
# under Site > Build & deploy > Continuous Deployment > Git Repo
print()
print("To enable auto-deploy from GitHub:")
print("1. Go to: https://app.netlify.com/projects/shubham-ramtekkar-portfolio")
print("2. Go to Site Configuration > Build & Deploy > Continuous Deployment")
print("3. Link your GitHub repo: Shubhss085/Shubhss085.github.io")
print("4. Set branch: master, Publish directory: /")
print()
print("Alternatively, I can set up a GitHub Action that auto-deploys on push.")
print("Run the next script to set up GitHub Actions.")
