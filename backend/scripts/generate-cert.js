// scripts/generate-cert.js
const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function generateCerts() {
  console.log('🚀 Generating self-signed SSL/TLS certificates...');

  const altNames = [
    { type: 2, value: 'localhost' },
    { type: 7, ip: '127.0.0.1' }
  ];

  // Add all local non-internal IPv4 addresses to Subject Alternative Names
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        altNames.push({ type: 7, ip: iface.address });
        console.log(`🔗 Added IP to SAN: ${iface.address}`);
      }
    }
  }

  const attrs = [{ name: 'commonName', value: 'localhost' }];
  const options = {
    keySize: 2048,
    days: 365,
    algorithm: 'sha256',
    extensions: [
      {
        name: 'subjectAltName',
        altNames: altNames
      }
    ]
  };

  try {
    const pems = await selfsigned.generate(attrs, options);
    
    // In newer selfsigned versions, pems could be an object containing private, public, cert
    const privateKey = pems.private || pems.key || pems.clientkey;
    const certificate = pems.cert || pems.certificate || pems.clientcert;

    if (!privateKey || !certificate) {
      console.log('Keys in generated pems:', Object.keys(pems));
      throw new Error('Generated key or cert is missing');
    }

    const configDir = path.join(__dirname, '../config');
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(path.join(configDir, 'key.pem'), privateKey);
    fs.writeFileSync(path.join(configDir, 'cert.pem'), certificate);

    console.log('✅ Certificates generated successfully in backend/config/ (key.pem, cert.pem)\n');
  } catch (error) {
    console.error('❌ Failed to generate certificates:', error);
    process.exit(1);
  }
}

generateCerts();
