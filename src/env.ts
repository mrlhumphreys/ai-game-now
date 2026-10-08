import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  PUBLIC_AI_SERVICE_URL: {
    public: true
  }
});
