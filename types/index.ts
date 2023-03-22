import React from 'react';

export interface AppProps {
  Component: React.ElementType;
  pageProps: any;
}

export type OptionItem = {
  id: string | number;
  name: string;
  selected?: boolean;
};
