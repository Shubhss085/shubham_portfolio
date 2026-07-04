import ssl, http.server, os, sys, datetime, socket

HOST = "0.0.0.0"
PORT = 4433
DIR = os.path.dirname(os.path.abspath(__file__))
CERT_FILE = os.path.join(DIR, "server.pem")

if not os.path.exists(CERT_FILE):
    from cryptography import x509
    from cryptography.x509.oid import NameOID
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import rsa
    import cryptography

    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
        x509.NameAttribute(NameOID.COMMON_NAME, "localhost"),
    ])
    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.datetime.now(datetime.timezone.utc))
        .not_valid_after(datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365))
        .add_extension(x509.SubjectAlternativeName([x509.DNSName("localhost")]), critical=False)
        .sign(key, hashes.SHA256())
    )
    with open(CERT_FILE, "wb") as f:
        f.write(key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.TraditionalOpenSSL, serialization.NoEncryption()))
        f.write(cert.public_bytes(serialization.Encoding.PEM))
    print("Generated self-signed certificate:", CERT_FILE)

os.chdir(DIR)
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer((HOST, PORT), handler)
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(CERT_FILE)
httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)

print(f"HTTPS Server running at https://localhost:{PORT}")
print(f"Open https://localhost:{PORT} in your browser")
httpd.serve_forever()
