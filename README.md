# Amalytica
<br>
Selenium based full-stack application that fetches vital data of Amazon ASINs.
<br>

## Table of Contents <!-- omit in toc -->
- [Amalytica](#Analytica)
  - [Overview](#Overview)
    - [Features](#Features)
    - [Goals](#Goals)
    - [Challenges](#Challenges)
  - [The MVP](#The-MVP)
    - [Client (Front End)](#Client-Front-End)
    - [Server (Back End)](#Server-Back-End)
    - [Dependencies](#Dependencies)
    - [Styling](#Styling)
    - [Linting](#Linting)
    - [Deployment](#Deployment)
    - [Procedural](#Procedural)
    
## Overview
<br>
Amalytica is an Amazon analytics tool that uses Selenium to fetch vital data, such as listing price, stock availablity and listings. These analytics are generally used by Amazon sellers as this data can provide better insights into which ASINs (Amazon Standard Identification Numbers) to choose for inventory decisions.
<br>

### Features
__Holistic Data__: Amalytica fetches data for not only the buy box seller, but also up to three additional sellers on the listing, ranging from cheapest listing prices. 
<br>
__Search any Amazon ASIN__: Amalytica does not exclude any product categories, which is often a problem for a lot of seller tools that are available on market. 
<br>
__Quick Data__: Amalytica runs requests as soon as you want it to. As soon as you search for an ASIN, we provide instant access to the scraper to grab up-to-date information. 
<br>

### Goals
__Deploy Selenium__: Amalytica uses Selenium which requires an enviroment to run inside of. Due to these constraints, being able to deply to a server with 24/7 access would be nice. 

__Data Visualization__: Use React data visualization tools to show charts and tables of data for each ASIN.


### Challenges
__Selenium Edge Cases__: Amazon's front-end differs slightly based on the time of running a query. Due to this, the crawlers can often run into situations where it is not sure what to do. I do, however, plan to combat this with rerunning the Selenium environment again and again until we get the data back. 

<br>

## The MVP

### Client (Front End)

- Landing page that describes Amalytica. 
- Login/Register forms that allows access to Amalytica's data.
- Have a form that allows you to search for a ASIN. 
- Consume ASIN data from **Ruby on Rails API**, and render that data in user landing page.
- Utilize **React Router**, for client-side routing.
- Utilize Authentication, permitting the user to:
  - Register, login, and send authenticated requests.
  - Perform `index` or `show` actions, **when they are logged in**.^
  - Perform `create`, `update`, and `delete` actions **when logged in**.

### Server (Back End)
- Have a **RESTful JSON API**.
  - Build a **Ruby on Rails** server.
    - Build a database with at least 3 tables:
     - 1 user table
     - 2 other tables, including ASINs and ASIN data.
  - Utilize **Rails** to define models for interact with the database.
  - Implement Authentication using **JWT**.
  - Implement working generic controller actions for full-CRUD (`index`, `show`, `create`, `update`, `delete`) between the 2 non-user tables AND partial-CRUD (`create`, at least) for the user table.

### Dependencies
- Selenium
- Geckodriver
- Firefox
- More coming soon...

### Styling
- Be styled with CSS.
- Use flexbox for indices (`display: flex`).
- Implement responsive design on 3 screen sizes (including desktop) using 2 media queries (tablet and mobile).

### Linting
- Indent properly.
- Utilize high-quality, semantic variable names.
- Follow `camelCase`, `snake_case`, and `kebab-case` convention.
- Remove unnecessary boilerplate React files and code.
- Remove all `console.log()`s and commented out code (functional notes and comments are okay).

### Deployment
- Deploy the fully functional front-end via Surge.
- Deploy the back-end via Heroku.

### Procedural
- Initialize a **git repo on Github**, with a link to hosted project.
- Have **frequent commits**, making a _robust_ commit history at least every day. (75 commits minimum)
- Use effective and safe **branching and merging** processes.
