/// <reference types="vite/client" />

declare module 'react-window-scroller' {
  import * as WindowScroller from 'react-window-scroller';
 export default WindowScroller
}

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_DOMAIN: string;
  VITE_CLIENT_ID: string;
  VITE_AUDIENCE: string;
}

