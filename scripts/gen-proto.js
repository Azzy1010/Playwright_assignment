const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const protocPath = 'C:\\protoc-31.1-win64\\bin\\protoc.exe';
const protoDir = path.resolve(__dirname, '../grpc/protos');
const protoFile = path.resolve(protoDir, 'crud.proto');
const outDir = path.resolve(__dirname, '../generated');
const pluginPath = path.resolve(__dirname, '../node_modules/.bin/protoc-gen-ts_proto.cmd');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

try {
  const cmd = `"${protocPath}"` +
    ` --plugin=protoc-gen-ts_proto="${pluginPath}"` +
    ` --ts_proto_out="${outDir}"` +
    ` --ts_proto_opt=outputClientImpl=grpc-js` +
    ` -I "${protoDir}"` +
    ` "${protoFile}"`;

  console.log('Running command:\n', cmd);
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Proto generated successfully');
} catch (err) {
  console.error('❌ Proto generation failed');
  console.error(err);
  process.exit(1);
}