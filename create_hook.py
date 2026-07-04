import json, urllib.request, os

config_path = os.path.expanduser('~/.netlify/config.json')
try:
    with open(config_path) as f:
        config = json.load(f)
    token = config.get('accessTokens', {}).get('default', '')
except:
    token = ''

if not token:
    # Try to get token from environment or another method
    print("Token not found in config.json")
    exit(1)

site_id = '489d9fb2-d87b-4676-b115-6d9a19c163d9'

# Create a deploy hook
url = f'https://api.netlify.com/api/v1/sites/{site_id}/deploy_keys'
req = urllib.request.Request(url, method='POST')
req.add_header('Authorization', f'Bearer {token}')
req.add_header('Content-Type', 'application/json')

try:
    data = json.dumps({"title": "GitHub auto-deploy"}).encode()
    req2 = urllib.request.Request(f'https://api.netlify.com/api/v1/sites/{site_id}/deploy-hooks', 
                                   data=data, method='POST')
    req2.add_header('Authorization', f'Bearer {token}')
    req2.add_header('Content-Type', 'application/json')
    resp = urllib.request.urlopen(req2)
    result = json.loads(resp.read())
    print("Deploy hook created!")
    print("Hook URL:", result.get('url'))
    print("Hook ID:", result.get('id'))
except urllib.error.HTTPError as e:
    print('Error:', e.code, '-', e.read().decode())
except Exception as e:
    print('Error:', e)
