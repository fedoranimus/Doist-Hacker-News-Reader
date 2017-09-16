# Doist-Hacker-News-Reader

## Getting Started

Install packages

```npm i```

Run Webpack Dev Server 

```npm start```

Chrome debug tools can be used to easily demonstrate throttled network requests & offline support

## Assumptions

1. Support for Greenfield Browsers (Chrome, primarily)
1. Architected to support easily adding new views
1. Managed State Management is not necessary at this stage
1. Created a simple version of the HackerNews UI

## Technology Stack

1. Aurelia (SPA Framework)
1. Typescript (<3)
1. Webpack (Bundling/Dev Server)
1. Spawned from my personal Webpack-Typescript-Aurelia boilerplate
1. HTTP Requests provided by aurelia-fetch-client
1. WebpackOffline used to provide offline webpack bundle hosting (API caching done by me)

## Improvements

1. Split Webpack build into smaller bundles
1. Create production distribution
1. Write Tests!
1. Managed state system (Redux, rxjs, global class, etc) - decided against it for a system of this scale
1. Load and cache data for the infinite scroll in the background to provide a smoother and better offline experience
1. Have a more module cache for requests
1. Have smaller, more directed check-ins