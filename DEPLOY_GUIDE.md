# 🌐 Shop Deployment Guide (GitHub + Vercel)

Your shop is now set up for **Direct WhatsApp Ordering**. No payment keys are required!

### 1. Push to GitHub
Run these commands in your terminal:
```powershell
git add .
git commit -m "Remove Paystack - Switch to WhatsApp Ordering"
git push origin main
```

### 2. Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and import your `site` repository.
2.  **No Environment Variables** are needed anymore!
3.  Click **Deploy**.

### 3. Connect your Domain
1.  Under Project Settings > **Domains**, add `centuryboy.shop` and `www.centuryboy.shop`.
2.  Update your DNS records if needed.

**Your shop is now live and orders will come directly to your WhatsApp!**
