import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QTN1AK1FEwOxerZfCn4zCfYZPLxgw3WwLdL2kaTBfEmexHfeoyiP2BoAWQMVkFM5w5xTrk7OPWUMelS4ktPgXqK00TW5tdcvp', {
  locale: 'ar' // Set Arabic as default language
});

export default stripePromise;