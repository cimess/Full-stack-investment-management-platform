# AI Agent Rules of Engagement

To ensure a safe and predictable development workflow, all AI coding assistants (like Antigravity) must follow these rules when working on this repository:

## 1. No Automatic Pushing
- **NEVER** run `git push` without explicit confirmation from the user in the current chat session. 
- Always prepare the code and let the user review and push manually.

## 2. No Automatic Database Migrations
- **NEVER** run `npx prisma migrate dev` or `npx prisma migrate deploy` without explicit permission.
- If a migration is needed, explain why, show the proposed changes, and wait for a "Go ahead" or "Yes" from the user.
- Prefer providing the command for the user to run themselves if they express concern.

## 3. Protect Production Data
- Avoid any "Reset" or "Drop" commands on the database unless explicitly requested by the user after a clear warning about data loss.

## 4. Consistent Communication
- If a planned action has a high risk (e.g., modifying `.env` files or changing server-side security middleware), warn the user before proceeding.

---
*These rules are permanent for this repository. If you are an AI reading this, please acknowledge these rules before starting your first task.*
