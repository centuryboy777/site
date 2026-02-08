# 🌐 Custom Domain Deployment Guide (www.centuryboy.shop)

To make your shop live at **www.centuryboy.shop**, follow these instructions to connect your files to a global server.

### 1. Upload Your Files to GitHub
Since you already have the files, the easiest way to deploy is to upload them to a private **GitHub repository**.
1.  Go to [GitHub.com](https://github.com) and create a repository named `century-hub`.
2.  Upload all the files from your local folder `site 3` to this repository.

### 2. Deploy the Backend on Render
1.  Sign up at [Render.com](https://render.com).
2.  Click **"New +"** > **"Web Service"**.
3.  Choose your `century-hub` repository.
4.  **Settings**:
    - **Name**: `century-hub-backend`
    - **Language**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
5.  **Environment Variables** (Under the "Environment" tab):
    - `PAYSTACK_SECRET_KEY`: (Your sk_live... from .env)
    - `PAYSTACK_PUBLIC_KEY`: (Your pk_live... from .env)
6.  Click **Deploy**. Render will give you a URL like `https://century-hub-backend.onrender.com`.

### 3. Connect your Domain (centuryboy.shop)
Now, to make it work on your actual domain:
1.  In Render, go to your Web Service > **Settings** > **Custom Domains**.
2.  Add `www.centuryboy.shop` and `centuryboy.shop`.
3.  Go to your Domain Provider (where you bought the domain, e.g., Namecheap, GoDaddy):
    - **CNAME Record**: Set `www` to point to your Render URL (`century-hub-backend.onrender.com`).
    - **A Record**: Set `@` to point to the IP address Render provides in their settings.

### 4. Why this matters?
- **Global Access**: Anyone, anywhere, on any network can now shop at `www.centuryboy.shop`.
- **SSL (Security)**: Your site will have the "Lock" icon (`https`) automatically, which builds trust with your customers.
- **Paystack Success**: Paystack requires a live domain for successful production verification, and now you have it!

**Once you complete step 2, let me know the Render URL, and I will do the final check for you!**
