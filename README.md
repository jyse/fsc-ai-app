This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# fsc-ai-app

API RecommendTalks
// Accept a POST request with:
// summary (from the PDF)
// selectedTags (from the user)
// Process the recommendation logic
// Return a list of recommended talks

User prompt in UI → /api/recommendTalks → Python server → model → AI response → back to frontend

# Run Virtual environment and Python server

jessythe@jessys-mbp-2 fsc-ai-app % cd ai-server
jessythe@jessys-mbp-2 ai-server % source venv/bin/activate
(venv) jessythe@jessys-mbp-2 ai-server % python app.py

How to install
How to run the app
How to train new models (if applicable)
This repo uses Git LFS. You need to install Git LFS to clone it properly.

Run this before you clone this repo
git lfs install
git clone https://github.com/jyse/fsc-ai-app.git
