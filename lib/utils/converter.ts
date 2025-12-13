import { AppRouteHandlerRoutes, AppRoutes } from '~/.next/types/routes';

type ExtractParams<T extends string> = T extends `${string}[${infer Param}]${infer Rest}` ? Param | ExtractParams<Rest> : never;

type URLParamsObject<T extends AppRoutes> = ExtractParams<T> extends never
  ? // biome-ignore lint/complexity/noBannedTypes: <>
    {} // no params
  : { [K in ExtractParams<T>]: string };

type EndpointParamsObject<T extends AppRouteHandlerRoutes> = ExtractParams<T> extends never
  ? // biome-ignore lint/complexity/noBannedTypes: <>
    {} // no params
  : { [K in ExtractParams<T>]: string };

/**
 *
 * @param url AppRoutes infer from next
 * @param params params that included at dynamic params
 * @returns string url
 *
 * @example
 * url('/[clientId]/cv/[cvId]', { clientId: '1', cvId: '88' })
 * => "/2/cv/88"
 */
export function url<T extends AppRoutes>(url: T, params?: URLParamsObject<T>): string {
  //@ts-expect-error
  return url.replace(/\[(.*?)\]/g, (_, key) => params[key]);
}

/**
 *
 * @param endpoint AppRouteHandlerRoutes infer from next
 * @param params params that included at dynamic params
 * @returns string url
 *
 * @example
 * endpoint('/api/[clientId]/cv/[id]', { clientId: '1', id: '4' })
 * => "/api/1/cv/4"
 */
export function endpoint<T extends AppRouteHandlerRoutes>(url: T, params: EndpointParamsObject<T>): string {
  //@ts-expect-error
  return url.replace(/\[(.*?)\]/g, (_, key) => params[key]);
}
