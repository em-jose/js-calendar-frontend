# React Journal

## Overview

Calendar app built with React and React Redux. The app allows you to create a user and manage a calendar, being able to create events as reminders with a set date and edit or delete them later.

The backend has been created with Node.js and you can see the code in [this repository](https://github.com/em-jose/js-calendar-backend).

## Tech stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Init

### 1. Install dependencies

* This project uses [npm](https://docs.npmjs.com/about-npm) as a dependency manager.
* To install all dependencies run the following command:

```bash
npm install
```

### 2. Create .env files

* Create the ".env" file with the following variables:

```txt
VITE_MODE=dev
VITE_API_URL=http://localhost:4000/api
```

* Create the ".env.test" file with the following variables:

```txt
VITE_MODE=test
VITE_API_URL=http://localhost:4000/api
```

* Create the ".env.production" file with the following variables:

```txt
VITE_MODE=prod
VITE_API_URL=http://localhost:4000/api
```

### 3. Launch the development server

```bash
npm run dev
```

## Commands

| Command          | Action                                        |
| :--------------- | :-------------------------------------------- |
| `dev`            | Run the local development server.  |
| `build`          | Check for possible errors and build production packaging in `./dist/`.      |
| `test`           | Launch tests. |
