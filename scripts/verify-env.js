/* global process */

const domain = process.env.KATAS_SERVICE_DOMAIN;

if (!domain) {
  const msg = `Environment variable "KATAS_SERVICE_DOMAIN" must be set.
E.g. to the default value "katas.tddbin.com" (or a local domain, if you want).
This variable will be used to build the path where to find the metadata of the ES6 katas.
E.g. this file: http://katas.tddbin.com/katas/es6/language/__grouped__.json`;
  throw new Error(msg);
}
