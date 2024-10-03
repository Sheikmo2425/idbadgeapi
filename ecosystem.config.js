module.exports = {
  apps: [
    {
      name: 'idbadge',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_local: {
        NODE_ENV: 'local',
      },
    },
  ],
};