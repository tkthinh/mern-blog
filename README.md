# Fullstack Blog with PERN Stack

Welcome to the Fullstack Blog Application! This project is a fully-featured blog platform built with the PERN stack and enhanced with several modern tools for optimal performance and development experience.




## Tech Stack

**Client:** React, Redux, TailwindCSS, Quill Editor

**Server:** Node, Express

**Database:** PostgreSQL w/DrizzleORM


## Highlights

- PERN Stack: Postgres, Express, React, and Node.js form the backbone of the application.
- DrizzleORM: Used on top of PostgreSQL for managing database queries and migrations.
- TypeScript: Ensures type safety across both the client and server, preventing runtime errors and providing a better developer experience.
- WYSIWYG Text Editor: Allows users to write rich-formatted content seamlessly.
- Google OAuth: Secure user authentication through Google’s OAuth 2.0.
- Image Upload: Users can upload images, which are stored via Firebase.
- TailwindCSS: Responsive and utility-first CSS framework for designing a fully responsive UI. Dark mode is included.
- Redux: State management tool used to handle the state of the application.
- User Actions: Users can create posts, leave comments, like posts, and bookmark posts.
## Installation

### Prerequisites
Make sure you have the following installed:

- Node.js (v18+)
- PostgreSQL (v12+)
- Firebase account for image storage
- Google Developer account for OAuth configuration

1. Clone the project

```bash
  git clone https://github.com/tkthinh/pern-blog.git
  cd pern-blog
```

2. Install dependencies seperately on both client and server folder:
```bash
  npm install
  or
  yarn install
```

3. Set up environment variables:
- Create a `.env` file in the ./server directory
- Add your database config and your choice of key:
  ```
  DATABASE_URL = ''
  PORT = ''
  JWT_SECRET = ''
  ```

- Create a `.env` file in the ./client directory
- Add your Firebase app's config:
  ```
  VITE_API_KEY=
  VITE_AUTH_DOMAIN=
  VITE_PROJECT_ID=
  VITE_STORAGE_BUCKET=
  VITE_MESSAGING_SENDER_ID=
  VITE_APP_ID=
  ```

4. Run the development on both side
```bash
  npm run dev
  or
  yarn run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) 

