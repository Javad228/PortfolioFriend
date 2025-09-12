# 🔐 Environment Variables Setup

Set these in your **Netlify dashboard** → **Site settings** → **Environment variables**:

## 🎯 Auth0 Configuration

```bash
AUTH0_SECRET=use_openssl_rand_hex_32_to_generate_32_bytes_value
AUTH0_BASE_URL=https://your-site.netlify.app
AUTH0_ISSUER_BASE_URL=https://dev-dbfj10ydypt5c333.auth0.com
AUTH0_CLIENT_ID=your_client_id_from_auth0
AUTH0_CLIENT_SECRET=your_client_secret_from_auth0
```

## 🐙 GitHub Configuration

```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=pixel-portfolio
```

---

## 📋 Step-by-Step Setup:

### 1. **Generate AUTH0_SECRET**
```bash
openssl rand -hex 32
```
Copy the output to AUTH0_SECRET

### 2. **Auth0 Application Setup**
In your Auth0 dashboard:
- **Allowed Callback URLs**: `https://your-site.netlify.app/api/auth/callback`
- **Allowed Logout URLs**: `https://your-site.netlify.app`
- **Allowed Web Origins**: `https://your-site.netlify.app`

### 3. **GitHub Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` scope
3. Copy token to GITHUB_TOKEN

### 4. **Set Environment Variables in Netlify**
1. Netlify dashboard → Your site → Site settings → Environment variables
2. Add each variable above
3. Redeploy your site

---

## 🎮 Usage:

After setup:
- **Portfolio**: `https://your-site.netlify.app`
- **Admin Dashboard**: `https://your-site.netlify.app/dashboard`
- **Login**: Automatically redirects to Auth0

The dashboard will save changes directly to GitHub and trigger automatic redeployment!
