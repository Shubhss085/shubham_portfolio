import json, urllib.request, os

config_path = os.path.expanduser('~/.netlify/config.json')
try:
    with open(config_path) as f:
        config = json.load(f)
    token = config.get('accessTokens', {}).get('default', '')
except Exception as e:
    print("Config error:", e)
    token = ''

print(f'Token available: {bool(token)}')

if token:
    site_id = '489d9fb2-d87b-4676-b115-6d9a19c163d9'
    url = f'https://api.netlify.com/api/v1/sites/{site_id}'
    data = json.dumps({'custom_domain': 'shubham-ramtekkar-portfolio.com'}).encode()
    req = urllib.request.Request(url, data=data, method='PATCH')
    req.add_header('Authorization', f'Bearer {token}')
    req.add_header('Content-Type', 'application/json')
    try:
        resp = urllib.request.urlopen(req)
        result = json.loads(resp.read())
        print('Domain set to:', result.get('custom_domain'))
        print('URL:', result.get('ssl_url'))
    except urllib.error.HTTPError as e:
        print('Error:', e.code, '-', e.read().decode())
else:
    print('No token found')
