
import getConfig from 'next/config';

const config = getConfig();

export const API_URI = config?.serverRuntimeConfig?.apiUrl || config?.publicRuntimeConfig?.apiUrl;
export const PUBLIC_API_URI = process.env.NEXT_PUBLIC_API_URI;
export const FRONT_URI = process.env.NEXT_URI;

export const CATEGORY_API_URI = '/category';
export const GAME_API_URI = '/game';
