import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, './user.proto'));
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

// Choose TLS or not
const USE_TLS = false;

const target = USE_TLS
  ? 'grpcb.in:9001' // with TLS
  : 'grpcb.in:9000'; // without TLS

const creds = USE_TLS
  ? grpc.credentials.createSsl() // for secure connection
  : grpc.credentials.createInsecure(); // for no TLS

const client = new grpcObject.user.UserService(target, creds);

export default client;