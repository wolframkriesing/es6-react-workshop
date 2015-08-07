/* global process */

const domain = process.env.KATAS_SERVICE_DOMAIN;
export const URL_PREFIX = `http://${domain}/katas/es6/language`;
export const KATAS_URL = `${URL_PREFIX}/__grouped__.json`;
