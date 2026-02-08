# 🌐 Custom Domain Deployment Guide (GitHub + Vercel)

To make your shop live at **www.centuryboy.shop** and **api.centuryboy.shop**, follow these instructions.

### 1. Upload Your Files to GitHub
Since you already have the files, the easiest way to deploy is to upload them to a private **GitHub repository**.
1.  Go to [GitHub.com](https://github.com) and create a repository named `century-hub`.
2.  Upload all the files from your local folder `site 3` (including the new `vercel.json`) to this repository.

### 2. Deploy on Vercel
1.  Sign up at [Vercel.com](https://vercel.com) using your GitHub account.
2.  Click **"Add New"** > **"Project"**.
3.  Import your `century-hub` repository.
4.  **Settings**:
    - **Framework Preset**: Other (it will detect `vercel.json` automatically).
    - **Environment Variables**:
      - `PAYSTACK_SECRET_KEY`: (Your sk_live... from .env)
      - `PAYSTACK_PUBLIC_KEY`: (Your pk_live... from .env)
5.  Click **Deploy**. Vercel will give you a URL.

### 3. Connect your Domain (centuryboy.shop)
1.  In Vercel, go to your Project > **Settings** > **Domains**.
2.  Add `www.centuryboy.shop` and `api.centuryboy.shop`.
3.  Vercel will show you the **DNS Records** (CNAME or A records) to add to your domain provider (e.g., Godaddy, Namecheap).

### 4. 🔒 Secure Secrets Management
It is **CRITICAL** that you never upload your real keys to GitHub in a file. Here is how to handle them safely:

#### A. In GitHub (For Safety)
If you want to store them in your GitHub settings (though Vercel is the main place):
1.  Go to your GitHub Repository > **Settings**.
2.  Click **Secrets and variables** > **Actions**.
3.  Click **New repository secret**:
    - Name: `PAYSTACK_SECRET_KEY` | Value: (Your Live Secret Key)
    - Name: `PAYSTACK_PUBLIC_KEY` | Value: (Your Live Public Key)

#### B. In Vercel (For the Live Website)
This is the most important part to make the site work:
1.  In **Vercel**, go to your Project > **Settings** > **Environment Variables**.
2.  Add both keys here just like you did in the `.env` file.
3.  Vercel will inject these into your code automatically when it runs.

### 5. Continuous Deployment
Every time you push a change to GitHub, Vercel will automatically update your live site!

**Everything is now configured for Vercel. Let me know once you've pushed to GitHub!**

