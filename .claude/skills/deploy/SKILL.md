---
name: deploy
description: Deploy the expense tracker - run tests, build the production bundle, and push to staging. Use when the user asks to deploy, ship, or release the app, or invokes /deploy.
---

# Deploy

Run the deployment steps in order. Stop and report if any step fails - do not proceed to the next step.

1. **Run tests**
   - This repo has no test suite configured (see [CLAUDE.md](../../../CLAUDE.md)). Run `npm run lint` as the check gate instead.
   - If lint fails, stop and report the failures instead of continuing.

2. **Build the production bundle**
   - Run `npm run build`.
   - If the build fails, stop and report the errors instead of continuing.

3. **Push to staging**
   - No staging remote/host is configured in this repo yet (no CI config, no deploy target).
   - TODO: once a staging destination exists (e.g. a git remote, Vercel/Netlify project, or server), replace this step with the actual push/deploy command.
   - Until then, report that the build succeeded and that the staging push step is a placeholder pending a configured target.
