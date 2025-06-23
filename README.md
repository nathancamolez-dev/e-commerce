This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project is a modern e-commerce example built with Next.js,
designed to showcase best practices in cart behavior and UI/UX design.

It demonstrates a smooth, interactive shopping experience,
balancing client components for instant UI responsiveness (like adding/removing items,
updating quantities) and server components for efficient data fetching, pricing calculations,
and inventory checks when needed.

The authenticantion is provided by [NextAuth.js](https://next-auth.js.org/), using OAuth with Google account.
The ideia is make the most easier way to create an account on the store.

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Remember that using the NextAuth is necessary that you create an account on Google API to use the OAuth.
Or any other provider that you use.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

TODO:

- [ ] Use Database,and maybe change the context for the cart.
- [ ] Make the checkout page
- [ ] Make the add product page for manager(need solutions for image upload)
