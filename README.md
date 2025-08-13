Got it — here’s a **full README.md** that keeps your Week 1 & Week 2 progress, adds the installation instructions for your Vite setup, and has a clean structure.

---

````md
# 🎵 EchoDust Music Player

**Unlock the soundtrack of your soul.**  
EchoDust is a web-based music discovery app that lets users explore tracks by mood, genre, or search keywords, using the Deezer API.

---

## ✅ Week 1 Progress
- [x] Finalized project idea
- [x] Chose API (Deezer)
- [x] Tested API queries in browser
- [x] Created GitHub repo & README

## ✅ Week 2 Progress
- [x] Designed main page wireframe (web & mobile)
- [x] Added mood & genre dropdown selection under slogan
- [x] Added "Popular Right Now" playlist section
- [x] Added persistent "Now Playing" bar
- [x] Created back navigation (back arrow + "Back Home" text)
- [x] Completed full component tree with descriptions
- [x] Created user flow diagram
- [x] Updated README with new progress

---

## 📂 Component Tree

### Main Components
1. **Header**  
   - Logo (top-left)  
   - Search Bar (top-right)

2. **Hero Section**  
   - Slogan: *"Unlock the soundtrack of your soul"*  
   - Mood Selector (dropdown)  
   - Genre Selector (dropdown)

3. **Popular Right Now**  
   - Displays trending tracks/playlists fetched from the API

4. **Now Playing Bar** *(Persistent)*  
   - Track info (title, artist, album art)  
   - Playback controls (play/pause, skip)

5. **Search Results Page**  
   - List of tracks matching search/mood/genre  
   - TrackItem component for each track

6. **Back Navigation**  
   - Left arrow icon  
   - Text link: "Back Home"

---

## 🔄 User Flow
1. **Landing Page** → User sees header, slogan, dropdowns, popular playlists, now playing bar.
2. **Search / Select Mood / Select Genre** → App fetches and displays results on Search Results Page.
3. **Click on Track** → Updates Now Playing bar with selected track.
4. **Back Home** → User returns to main landing page.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/echodust-music-player.git
   cd echodust-music-player
````

2. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

To start the development server:

```bash
cd frontend
npm run dev
```

---

## 📂 Project Structure

```
echodust-music-player/
│
├── README.md
├── frontend/            # Vite + React app
│   ├── index.html
│   ├── src/             # React components, pages, styles
│   ├── public/          # Static assets
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```

---

## 📅 Timeline

**Week 1:** Research, API selection, initial README
**Week 2:** Wireframes, component tree, user flow
**Week 3:** Environment setup, initial components, API integration
**Week 4:** Styling & interactions
**Week 5:** Final polish & deployment


