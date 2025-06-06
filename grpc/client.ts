import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './protos/your_service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcPackage: any = grpc.loadPackageDefinition(packageDefinition).yourpackage;

export const grpcClient = new grpcPackage.YourService(
  'grpc://grpcb.in:9001', // Example gRPC test server
  grpc.credentials.createSsl()
);