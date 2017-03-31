// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// export const environment = {
//   production: false,
//   endpoint: '192.168.2.2:8080',
//   endpointSSL: false,
//   sentryKey : 'https://d560f6e5b3884e61a0aed1920c1f841d@sentry.io/153802'
// };

export const environment = {
  production: false,
  endpoint: 'api.lijstr.nl',
  endpointSSL: true,
  sentryKey : 'https://d560f6e5b3884e61a0aed1920c1f841d@sentry.io/153802'
};
