cd ssl

# openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
# openssl x509 -outform der -in cert.pem -out cert.crt

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout private.key -out selfsigned.crt \
  -subj "/C=AU/ST=Some-State/L=City/O=Internet Widgits Pty Ltd/OU=Section/CN=localhost/emailAddress=email@example.com"

service nginx start

cd /app/website
npx tailwindcss -i ./src/styles/style.css -o ./src/styles/output.css --watch
npx ts-node ./app.ts

# tail -f /dev/null