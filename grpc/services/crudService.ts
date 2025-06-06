import { grpcClient } from '../client';

export const CrudService = {
  create: (data: any) => {
    return new Promise((resolve, reject) => {
      grpcClient.Create(data, (err: any, response: any) => {
        if (err) return reject(err);
        resolve(response);
      });
    });
  },

  read: (id: string) => {
    return new Promise((resolve, reject) => {
      grpcClient.Read({ id }, (err: any, response: any) => {
        if (err) return reject(err);
        resolve(response);
      });
    });
  },

  update: (data: any) => {
    return new Promise((resolve, reject) => {
      grpcClient.Update(data, (err: any, response: any) => {
        if (err) return reject(err);
        resolve(response);
      });
    });
  },

  delete: (id: string) => {
    return new Promise((resolve, reject) => {
      grpcClient.Delete({ id }, (err: any, response: any) => {
        if (err) return reject(err);
        resolve(response);
      });
    });
  }
};