/* global __dirname */

import {useOfflineUrls} from '../src/scripts/make-urls-offline';
import fs from 'fs';
import path from 'path';

const indexHtmlInDist = path.join(__dirname, '../dist/index.html');
fs.writeFileSync(indexHtmlInDist, useOfflineUrls(fs.readFileSync(indexHtmlInDist, {encoding: 'utf8'})));
