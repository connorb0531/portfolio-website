## Dev Setup

### Requirements

[Node.js](https://nodejs.org/) (v18 or later recommended)

1. Clone the repository

   ```bash
   git clone https://github.com/connorb0531/portfolio-website.git
   cd portfolio-website
   ````
2. Install dependencies

    ```bash
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npm install @iconify/react @iconify-icons/logos
    npx tailwindcss init -p
    npm install -D vite
    ```

3. Setup environment variables

    Create a `.env` file inside `client` directory:

    ```servclienter/.env:
   VITE_BACKEND_URL= 
    ```

    Create a `.env` file inside `server` directory:

    ```server/.env:
    VITE_PORT=
    VITE_EMAIL_USER=cbuckley144@gmail.com
    VITE_EMAIL_PASS=
    ```

4. Start development server
    ```bash
    npm run dev
    ```

