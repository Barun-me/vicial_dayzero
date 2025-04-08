# Vicial

Vicial is a dedicated violence update platform designed to allow users to post real‑time violence updates. The app includes a driving mode (with mapping, routing, and alert markers) and a non‑driving mode (for posting updates). It leverages modern web technologies (Next.js, React, and TypeScript) along with MongoDB for data persistence and Clerk for user authentication. In addition, an integrated Machine Learning microservice verifies posts using a Python‑based model before saving to the database.

## Features
1. Real-time Violence Updates: Users post and view live violence updates.
2. Driving Mode: Drivers receive route-based alerts on the map if a violent update falls within their planned path.
3. Authentication: Custom sign‑in and sign‑up pages implemented with Clerk.
4. Image Uploads: Integrated with ImageKit for image storage.
5. Machine Learning Verification: A Flask‑based ML microservice validates the caption and image using a CNN and a RandomForest model before saving.
6. Automatic Data Cleanup: Violence update posts automatically expire after 24 hours using MongoDB TTL indexes.
7. Real-time Feed: The feed component refreshes automatically to show current updates

## Tech Stack :- 
1. Frontend: Next.js (App Directory), React, TypeScript, Tailwind CSS
2. Backend API: Next.js API routes or server actions (app directory)
3. Database: MongoDB (via Mongoose ORM)
4. Authentication: Clerk (custom sign‑in/up pages)
5. Image Storage: ImageKit
6. Real-time Updates & Routing: Google Maps JavaScript API & DirectionsService
7. ML Verification Service: Python (Flask), scikit‑learn, joblib

---

## Application Workflow

### 1. User Authentication

- **Sign-Up / Sign-In:**  
  Users can sign up or sign in using custom authentication pages built with Clerk.  
  - Options are available to sign up with Google or with traditional credentials (username, email, password).
  - After a successful sign‑up or sign‑in, the user is redirected to the home page where they can interact with the app.
  - The user’s information (such as avatar, username, etc.) is stored and associated with each post for display in the feed.

### 2. Posting Violence Updates

- **Filling the Update Form:**  
  On the home page, a user can post a new violence update using the Share component:
  - The user enters a **caption** describing the event.
  - They can upload an **image** associated with the update. The image is uploaded to ImageKit for processing and storage.
  - The user selects a **location** via an autocomplete input (powered by Google Places) and picks an **event date**.
  
- **Server-Side Processing (shareAction):**  
  Once the user clicks the **Post** button, the following steps occur on the server:
  1. The app collects the form data and uploads the image to ImageKit, receiving a processed image URL.
  2. The server then calls an external ML service to verify the post. This ML service (implemented in Python using Flask) analyzes both the caption and the image:
     - If the ML model confirms that the content is valid, the post is saved in the MongoDB database.
     - If the ML verification fails, the submission is rejected or flagged.
  3. The new update is stored in the database with additional metadata such as location, event date, and a reference to the user who posted it.
  4. Violence updates are automatically removed from the database after 24 hours using a TTL index on the `createdAt` field.

### 3. Viewing Violence Updates

- **Feed Component:**  
  The Feed component uses SWR to poll a dedicated API route (e.g., `/api/violence-updates`) for the latest violence updates, refreshing the list in near real-time.
  - Each post displays the caption, image, location, and the date/time it was submitted.
  - Posts also show the user’s avatar and name, indicating who submitted the update.

### 4. Driving Mode and Real-Time Map Integration

- **Map Display:**  
  A driving user can switch to Driving Mode, which displays a Google Map with the following features:
  - **Route Calculation:** The user enters their source and destination, and a driving route is computed using Google’s DirectionsService.
  - **Custom Markers:** Markers are added to the map for the source and destination.
  - **Violence Update Markers:** The application compares the location of posted violence updates with the calculated route. If any update’s location is near the route, a marker is automatically placed on the map.
  - **Real-Time Updates:** The map component periodically refreshes to include new updates so that drivers receive immediate alerts if an update falls along their route.

### 5. Overall Data Flow and Refresh

- **Data Consistency:**  
  The overall application (including Middlebar, Share, and Feed components) is refreshed automatically once a new update is posted. This is achieved through server actions and client-side refresh (using Next.js’s `router.refresh()` in a `useTransition` hook) to ensure that all users see the most current information.
- **Automated Cleanup:**  
  MongoDB automatically deletes posts older than 24 hours to ensure that only recent updates are shown.
---
