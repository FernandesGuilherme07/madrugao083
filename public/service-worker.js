import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.pathname === '/',
  new CacheFirst({
    cacheName: 'cache-v1',
    plugins: [
      {
        // Define uma expiração de 1 dia para os arquivos em cache
        cacheWillUpdate: async ({ response }) => {
          const cacheExpirationDate = Date.now() + 24 * 60 * 60 * 1000; // 1 dia em milissegundos
          const headers = response.headers.get('date');
          const serverDate = new Date(headers).getTime();
          const isCacheExpired = serverDate > cacheExpirationDate;
          if (isCacheExpired) {
            const newHeaders = new Headers(response.headers);
            newHeaders.set('date', cacheExpirationDate.toString());
            return {
              response: new Response(response.body, {
                status: response.status,
                headers: newHeaders,
              }),
            };
          }
          return response;
        },
      },
    ],
  })
);
