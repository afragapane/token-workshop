/* @hash 5ffe8e33d39f659617038338b78b37ec */
// tslint:disable
/* eslint-disable */
/* @source-map-hash d08692f6754c44cba5eba73d0420e22e */
import { OneClient, SourceMaps } from '@neo-one/client';
import { projectID } from './projectID';

let sourceMapsIn: Promise<SourceMaps> = Promise.resolve({});
if (process.env.NODE_ENV !== 'production' || process.env.NEO_ONE_DEV === 'true') {
  sourceMapsIn = Promise.resolve().then(async () => {
    const client = new OneClient(40101);
    const result = await client.request({
      plugin: '@neo-one/server-plugin-project',
      options: { type: 'sourceMaps', projectID },
    });

    return result.response;
  });
}

export const sourceMaps = sourceMapsIn;
