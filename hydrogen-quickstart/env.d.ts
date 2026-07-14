/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

interface ImportMetaEnv {
  readonly PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Env {
  SESSION_SECRET: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_ID: string;
  PRIVATE_STOREFRONT_API_TOKEN?: string;
  PUBLIC_CHECKOUT_DOMAIN: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_URL?: string;
  SHOPIFY_WEBHOOK_SECRET?: string;
  SHOPIFY_ADMIN_API_TOKEN?: string;
  PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_URL?: string;
  WAVESPEED_API_KEY?: string;
  PUBLIC_JUDGEME_SHOP_DOMAIN?: string;
  JUDGEME_API_TOKEN?: string;
  PUBLIC_KLAVIYO_COMPANY_ID?: string;
  PUBLIC_GA4_MEASUREMENT_ID?: string;
  PUBLIC_SWYM_STORE_ID?: string;
  PUBLIC_SWYM_WISHLIST_URL?: string;
  PUBLIC_SMILE_PUBLISHABLE_KEY?: string;
  PUBLIC_SMILE_REWARDS_URL?: string;
  PUBLIC_GORGIAS_WIDGET_ID?: string;
  PUBLIC_LOOP_RETURNS_URL?: string;
  PUBLIC_RECHARGE_STORE_IDENTIFIER?: string;
}

import '@total-typescript/ts-reset';
