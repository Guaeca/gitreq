# GitReq Deployment Guide

## Google Cloud Platform (GCP) Deployment

This guide covers deploying GitReq to Google Cloud Platform with a split backend and frontend architecture.

## Prerequisites

1. **GCP Account**: [Create account](https://cloud.google.com/)
2. **Google Cloud SDK**: [Install gcloud CLI](https://cloud.google.com/sdk/docs/install)
3. **Project Setup**: Create a new GCP project

```bash
# Login to GCP
gcloud auth login

# Create new project
gcloud projects create gitreq-prod --name="GitReq Production"

# Set project
gcloud config set project gitreq-prod

# Enable billing (required)
# Do this via the GCP Console
```

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│             Cloud CDN (Frontend)                 │
│        (Static files from Cloud Storage)        │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│          App Engine (Backend API)                │
│              (Node.js 18)                        │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│         Cloud SQL (PostgreSQL 15)                │
└─────────────────────────────────────────────────┘
```

## Step 1: Database Setup (Cloud SQL)

### Create PostgreSQL Instance

```bash
# Enable Cloud SQL API
gcloud services enable sqladmin.googleapis.com

# Create PostgreSQL instance
gcloud sql instances create gitreq-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=YOUR_STRONG_PASSWORD

# Create database
gcloud sql databases create gitreq --instance=gitreq-db

# Create user
gcloud sql users create gitreq-user \
  --instance=gitreq-db \
  --password=YOUR_USER_PASSWORD
```

### Get Connection Details

```bash
# Get instance connection name
gcloud sql instances describe gitreq-db --format="value(connectionName)"
```

Save this connection name for later.

## Step 2: Backend Deployment (App Engine)

### Enable Required APIs

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

### Update app.yaml

Edit `backend/app.yaml` and add your environment variables:

```yaml
runtime: nodejs18

env_variables:
  NODE_ENV: "production"
  DB_HOST: "/cloudsql/YOUR_CONNECTION_NAME"
  DB_PORT: "5432"
  DB_NAME: "gitreq"
  DB_USER: "gitreq-user"
  DB_PASSWORD: "YOUR_USER_PASSWORD"
  JWT_SECRET: "your-production-jwt-secret"
  JWT_EXPIRES_IN: "7d"

beta_settings:
  cloud_sql_instances: "YOUR_CONNECTION_NAME"
```

### Deploy Backend

```bash
cd backend

# Deploy to App Engine
gcloud app deploy

# View logs
gcloud app logs tail -s default

# Get backend URL
gcloud app describe --format="value(defaultHostname)"
```

## Step 3: Frontend Deployment (Cloud Storage + CDN)

### Build Frontend

```bash
cd frontend

# Update API URL in .env
echo "VITE_API_URL=https://YOUR_BACKEND_URL/api" > .env

# Build for production
npm run build
```

### Create Storage Bucket

```bash
# Create bucket (must be globally unique)
gsutil mb gs://gitreq-frontend

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://gitreq-frontend

# Configure as website
gsutil web set -m index.html -e index.html gs://gitreq-frontend
```

### Upload Frontend

```bash
# Upload built files
gsutil -m rsync -r -d dist gs://gitreq-frontend

# Set cache control
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" \
  gs://gitreq-frontend/assets/**
```

### Setup Cloud CDN (Optional but Recommended)

1. Go to Cloud Console → Network Services → Load Balancing
2. Create HTTP(S) Load Balancer
3. Configure backend bucket: `gitreq-frontend`
4. Enable Cloud CDN
5. Get load balancer IP address

### Setup Custom Domain (Optional)

```bash
# Reserve static IP
gcloud compute addresses create gitreq-frontend-ip --global

# Get IP
gcloud compute addresses describe gitreq-frontend-ip --global

# Point your domain to this IP
# Then configure SSL certificate in Load Balancer
```

## Step 4: Initialize Database Schema

```bash
# Connect to Cloud SQL
gcloud sql connect gitreq-db --user=postgres

# Or use Cloud SQL Proxy
cloud_sql_proxy -instances=YOUR_CONNECTION_NAME=tcp:5432
```

Then run the schema from `backend/src/database/schema.sql`

## Environment-Specific Configuration

### Production Checklist

- [ ] Use strong JWT secret
- [ ] Enable CORS only for your domain
- [ ] Set up SSL/HTTPS
- [ ] Configure proper database passwords
- [ ] Enable Cloud SQL backups
- [ ] Set up monitoring and alerts
- [ ] Configure auto-scaling limits
- [ ] Enable Cloud Armor (DDoS protection)

### Backend Production Settings

```javascript
// backend/src/config/index.js
export const config = {
  // ... other settings
  cors: {
    origin: process.env.FRONTEND_URL || 'https://your-domain.com',
  },
};
```

## Monitoring and Logging

### View Backend Logs

```bash
gcloud app logs tail -s default
```

### View Metrics

```bash
# Open monitoring dashboard
gcloud app open-console --logs
```

### Set Up Alerts

1. Go to Cloud Console → Monitoring
2. Create alerting policies for:
   - High error rates
   - High response times
   - Database connection issues

## Scaling Configuration

### Backend Scaling (App Engine)

Edit `backend/app.yaml`:

```yaml
automatic_scaling:
  min_instances: 1
  max_instances: 10
  target_cpu_utilization: 0.65
  target_throughput_utilization: 0.70
```

### Database Scaling (Cloud SQL)

```bash
# Upgrade tier if needed
gcloud sql instances patch gitreq-db \
  --tier=db-n1-standard-1
```

## Costs Estimation

### Free Tier Included
- App Engine: 28 instance hours/day
- Cloud Storage: 5GB
- Cloud SQL: Not included in free tier

### Estimated Monthly Costs (Minimal Usage)
- Cloud SQL (db-f1-micro): ~$7/month
- App Engine: ~$0-10/month (within free tier)
- Cloud Storage + CDN: ~$0-5/month
- **Total: ~$12-22/month**

### Cost Optimization
- Use Cloud SQL scheduled backups
- Enable auto-scaling to scale down during low traffic
- Use Cloud CDN to reduce origin requests
- Delete old log entries

## Backup and Recovery

### Automated Backups

```bash
# Enable automated backups
gcloud sql instances patch gitreq-db \
  --backup-start-time=03:00

# List backups
gcloud sql backups list --instance=gitreq-db
```

### Manual Backup

```bash
# Create backup
gcloud sql backups create --instance=gitreq-db

# Restore from backup
gcloud sql backups restore BACKUP_ID \
  --backup-instance=gitreq-db \
  --backup-id=BACKUP_RUN_ID
```

## Rollback

### Backend Rollback

```bash
# List versions
gcloud app versions list

# Route traffic to previous version
gcloud app services set-traffic default \
  --splits=VERSION_ID=1
```

### Frontend Rollback

```bash
# Re-upload previous build
gsutil -m rsync -r -d previous-dist gs://gitreq-frontend
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check Cloud SQL connection name
   - Verify credentials
   - Ensure Cloud SQL API is enabled

2. **CORS Errors**
   - Update CORS settings in backend
   - Check frontend API URL

3. **Build Failures**
   - Check Node.js version
   - Verify all dependencies are listed
   - Review build logs

### Debug Mode

```bash
# Deploy with debug
gcloud app deploy --verbosity=debug
```

## Security Best Practices

1. **Secrets Management**: Use Google Secret Manager
2. **Database**: Enable SSL connections
3. **API**: Rate limiting and authentication
4. **Frontend**: Enable HTTPS only
5. **IAM**: Principle of least privilege

## CI/CD Integration

For automated deployments, see `docs/CICD.md` (to be created).

## Support

For deployment issues:
- Check [GCP Documentation](https://cloud.google.com/docs)
- Review GCP logs and metrics
- Contact: eduardo@guaeca.fr
