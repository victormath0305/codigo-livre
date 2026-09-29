import path from 'path';
import { config } from 'dotenv';

const envPath = path.resolve(__dirname, '../../.env');
const { error } = config({ path: envPath });

if (error) {
  config({ path: path.resolve(__dirname, '../../sample.env') });
}

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const defaultHomeLocation = vercelHost
  ? `https://${vercelHost}`
  : 'http://localhost:8000';

const defaultApiLocation =
  process.env.API_URL || (vercelHost ? '/api' : 'http://localhost:3000');

const {
  HOME_LOCATION: homeLocation = defaultHomeLocation,
  API_LOCATION: apiLocation = defaultApiLocation,
  FORUM_LOCATION: forumLocation = 'https://forum.freecodecamp.org',
  NEWS_LOCATION: newsLocation = 'https://www.freecodecamp.org/news',
  RADIO_LOCATION: radioLocation,
  CLIENT_LOCALE: clientLocale = 'english',
  CURRICULUM_LOCALE: curriculumLocale = 'english',
  ALGOLIA_APP_ID: algoliaAppId,
  ALGOLIA_API_KEY: algoliaAPIKey,
  STRIPE_PUBLIC_KEY: stripePublicKey,
  PAYPAL_CLIENT_ID: paypalClientId,
  PATREON_CLIENT_ID: patreonClientId,
  DEPLOYMENT_ENV: deploymentEnv = 'staging',
  SHOW_UPCOMING_CHANGES: showUpcomingChanges,
  GROWTHBOOK_URI: growthbookUri,
  DEPLOYMENT_VERSION: deploymentVersion
} = process.env;

const locations = {
  homeLocation:
    vercelHost && homeLocation === 'http://localhost:8000'
      ? defaultHomeLocation
      : homeLocation,
  apiLocation:
    (vercelHost || process.env.API_URL) &&
    apiLocation === 'http://localhost:3000'
      ? defaultApiLocation
      : apiLocation,
  forumLocation,
  newsLocation,
  radioLocation: !radioLocation
    ? 'https://coderadio.freecodecamp.org'
    : radioLocation
};

export default Object.assign(locations, {
  clientLocale,
  curriculumLocale,
  deploymentEnv,
  environment: process.env.FREECODECAMP_NODE_ENV || 'development',
  algoliaAppId:
    !algoliaAppId || algoliaAppId === 'app_id_from_algolia_dashboard'
      ? ''
      : algoliaAppId,
  algoliaAPIKey:
    !algoliaAPIKey || algoliaAPIKey === 'api_key_from_algolia_dashboard'
      ? ''
      : algoliaAPIKey,
  stripePublicKey:
    !stripePublicKey || stripePublicKey === 'pk_from_stripe_dashboard'
      ? null
      : stripePublicKey,
  paypalClientId:
    !paypalClientId || paypalClientId === 'id_from_paypal_dashboard'
      ? null
      : paypalClientId,
  patreonClientId:
    !patreonClientId || patreonClientId === 'id_from_patreon_dashboard'
      ? null
      : patreonClientId,
  showUpcomingChanges: showUpcomingChanges === 'true',
  growthbookUri:
    !growthbookUri || growthbookUri === 'api_URI_from_Growthbook_dashboard'
      ? null
      : growthbookUri,
  deploymentVersion: deploymentVersion || 'unknown'
});
