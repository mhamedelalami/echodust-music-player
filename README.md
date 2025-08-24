# 🎧 EchoDust

**Unlock the soundtrack of your soul.**  
EchoDust is a mood-based music player built with **React** and **Inline CSS Styling**. It allows users to search for music or discover tracks based on predefined moods such as “Chill,” “Happy,” or “Romantic,” using the **Deezer API**.

---

## 🌟 Features (Planned)
- Search music tracks by artist, genre, or title
- Mood-based discovery (Chill, Energetic, Sad, etc.)
- Genre-based discovery (Lo-fi, Psytrance, etc.)
- Audio playback controls (Play/Pause)
- Responsive design with album art
- Deployable on Netlify/Vercel

---

## 🔧 Tech Stack
- React.js
- Inline CSS Styling
- Deezer API
- HTML5 `<audio>`

---

## 📅 Timeline (Week-by-Week)

| Week | Focus |
|------|-------|
| 1    | Planning, API testing, GitHub setup |
| 2    | Wireframes and UI component planning |
| 3    | Search functionality and API integration |
| 4    | Mood filtering and audio player |
| 5    | Testing, final fixes, deployment and submission |

---

## ✅ Week 1 Progress
- [x] Finalized project idea
- [x] Chose API (Deezer)
- [x] Tested API queries in browser
- [x] Created GitHub repo & README

---

## 🧱 Component Tree & Interface Architecture

### 📁 App Structure
```

App
├── Routes
│   ├── HomePage
│   │   ├── Header
│   │   │   ├── Logo
│   │   │   └── MoodGenreSelector
│   │   ├── PopularTrackList
│   │   │   └── TrackCard (xN)
│   │   └── NowPlayingBar
│   ├── SearchResultsPage
│   │   ├── BackHomeButton
│   │   ├── SearchResultsList
│   │   │   └── TrackCard (xN)
│   │   └── NowPlayingBar
│   ├── NowPlayingPage
│   │   ├── BackHomeButton
│   │   ├── AlbumArt
│   │   ├── TrackList
│   │   │   └── TrackCard (xN)
│   │   └── NowPlayingBar
│   └── NotFoundPage
└── Shared
├── TrackCard
├── NowPlayingBar
├── BackHomeButton
├── MoodGenreSelector
└── HamburgerMenu (Mobile only)

```

### 🧩 Component Descriptions

| Component           | Description |
|--------------------|-------------|
| App                 | Root component that contains routing logic and wraps all pages. |
| HomePage            | Displays logo, mood/genre selector, popular tracks, and persistent player bar. |
| SearchResultsPage   | Shows tracks based on selected mood/genre or search query. |
| NowPlayingBar      | Displays detailed info of currently playing track or album. |
| NotFoundPage        | Fallback route for undefined paths. |
| Logo                | Displays the EchoDust logo. |
| MoodGenreSelector   | Dropdown selector to browse tracks by mood or genre. |
| TrackCard           | Reusable component showing album art, title, artist, and play button. |
| NowPlayingBar       | Persistent bottom bar with current track info and playback controls. |
| BackHomeButton      | Left-arrow and "Back Home" text for navigation. |
| HamburgerMenu       | Mobile-only menu for navigation and search. |

---

## 📱 Mobile vs Web Differences

| Element       | Web                           | Mobile                         |
|---------------|-------------------------------|-------------------------------|
| Navigation    | Top navigation + dropdowns    | Hamburger menu with slide-out |
| Mood/Genre    | Inline next to logo           | Vertically stacked below logo |
| Search        | Top-right bar                 | In hamburger menu             |
| NowPlayingBar | Always visible                | Always visible, mobile-optimized |
| TrackList     | Grid layout                   | Vertical scrolling            |

---

## 🔁 User Flow Summary

### 🌐 Web
1. **Home Page**
   - View mood/genre options
   - See “Popular Right Now” list
   - Persistent player bar at bottom
2. **Discover via Mood/Genre**
   - Select mood/genre from dropdown
   - Redirect to SearchResultsPage
3. **Search by Query**
   - Type in search bar
   - Show matching results
4. **Play Track**
   - Click play on TrackCard
   - Track info updates in NowPlayingBar
5. **Now Playing**
   - Click album art → NowPlayingPage
   - Show full album art + tracklist

### 📱 Mobile
1. **Home Page**
   - Vertical stack of mood/genre
   - Hamburger menu icon for navigation
2. **Hamburger Menu**
   - Slide-out panel with search + nav links
3. **Search**
   - Search inside hamburger panel
4. **Track Playback**
   - Play updates bottom bar
   - Tap album art → NowPlaying view
5. **Now Playing Page**
   - Large album art + vertical tracklist
   - Persistent player bar + back button

---

## ✅ Week 2 Progress
- [x] Defined complete user flow (Web & Mobile)
- [x] Created detailed component tree with descriptions
- [x] Added back navigation (Back Home button) logic
- [x] Designed Home page wireframe (Web & Mobile)
- [x] Designed Search Results page wireframe (Web & Mobile)
- [x] Designed Now Playing page wireframe (Web & Mobile)
- [x] Completed full web & mobile prototype (Figma)


###  🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/echodust-music-player.git
   cd echodust-music-player

2. Navigate to the frontend folder:
   cd frontend

3. Install dependencies:
   npm install

### Running the App
To start the development server:
   cd frontend
   npm run dev

### 📂 Project Structure

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

Perfect 👍 Thanks for sharing the details. I’ll extend your README by adding **Week 3** and **Week 4** sections while respecting your original structure/format. Here’s the **fully updated README** with all progress included:

---

```markdown
# 🎧 EchoDust

**Unlock the soundtrack of your soul.**  
EchoDust is a mood-based music player built with **React** and **Tailwind CSS**. It allows users to search for music or discover tracks based on predefined moods such as “Chill,” “Happy,” or “Romantic,” using the **Deezer API**.

---

## 🌟 Features (Planned)
- Search music tracks by artist, genre, or title
- Mood-based discovery (Chill, Energetic, Sad, etc.)
- Genre-based discovery (Lo-fi, Psytrance, etc.)
- Audio playback controls (Play/Pause)
- Responsive design with album art
- Deployable on Netlify/Vercel

---

## 🔧 Tech Stack
- React.js
- Deezer API
- HTML5 `<audio>`

---

## 📅 Timeline (Week-by-Week)

| Week | Focus |
|------|-------|
| 1    | Planning, API testing, GitHub setup |
| 2    | Wireframes and UI component planning |
| 3    | Search functionality and API integration |
| 4    | Mood filtering and audio player |
| 5    | Testing, final fixes, deployment and submission |

---

## ✅ Week 1 Progress
- [x] Finalized project idea  
- [x] Chose API (Deezer)  
- [x] Tested API queries in browser  
- [x] Created GitHub repo & README  

---

## ✅ Week 2 Progress
- [x] Defined complete user flow (Web & Mobile)  
- [x] Created detailed component tree with descriptions  
- [x] Added back navigation (Back Home button) logic  
- [x] Designed Home page wireframe (Web & Mobile)  
- [x] Designed Search Results page wireframe (Web & Mobile)  
- [x] Designed Now Playing page wireframe (Web & Mobile)  
- [x] Completed full web & mobile prototype (Figma)  

---

## ✅ Week 3 Progress
- [x] Popular tracks now load and display on the **HomePage**  
- [x] **TrackCard** updated:
  - Clicking the card navigates to **NowPlayingPage**  
  - Clicking the play button updates only the **NowPlayingBar**  
- [x] **NowPlayingBar** functions properly:
  - Play/pause toggle  
  - Next/previous track navigation  
  - Clicking album art/track info navigates to **NowPlayingPage**  
- [x] Search bar and mood/genre filters fully functional  

---

## ✅ Week 4 Progress
- [x] Refactored the **NowPlayingBar** for better synchronization with the audio element  
- [x] Fixed **NowPlayingPage** to display full album tracks correctly  
- [x] Fixed **Next/Previous track buttons** for smooth navigation across all pages  
- [x] Improved persistent player behavior and started restructuring the **Header**  
- [x] Fully refactored the **Header and SearchBar** using inline styling for responsive design  
  - Added interactive focus effects  
  - Modernized purple-accented icon (#D0BCFF)  
- [x] Designed and implemented the **Hero Section** and **Popular Right Now carousel**  
  - Modern styling, hover effects, and responsive layout  
- [x] Built a **glassmorphic persistent Now Playing bar**:  
  - Gradient backgrounds (#D0BCFF, #5B21B6)  
  - Spinning album art, pulsing play button animations  
  - Smart volume control with expanding hover effect  
  - Enhanced progress bar with time display and hover feedback  
  - Micro-interactions and accessibility improvements  

---

## 🧱 Component Tree & Interface Architecture

### 📁 App Structure
```

App
├── Routes
│   ├── HomePage
│   │   ├── Header
│   │   │   ├── Logo
│   │   │   └── MoodGenreSelector
│   │   ├── PopularTrackList
│   │   │   └── TrackCard (xN)
│   │   └── NowPlayingBar
│   ├── SearchResultsPage
│   │   ├── BackHomeButton
│   │   ├── SearchResultsList
│   │   │   └── TrackCard (xN)
│   │   └── NowPlayingBar
│   ├── NowPlayingPage
│   │   ├── BackHomeButton
│   │   ├── AlbumArt
│   │   ├── TrackList
│   │   │   └── TrackCard (xN)
│   │   └── NowPlayingBar
│   └── NotFoundPage
└── Shared
├── TrackCard
├── NowPlayingBar
├── BackHomeButton
├── MoodGenreSelector
└── HamburgerMenu (Mobile only)


### 🧩 Component Descriptions

| Component           | Description |
|--------------------|-------------|
| App                 | Root component that contains routing logic and wraps all pages. |
| HomePage            | Displays logo, mood/genre selector, popular tracks, and persistent player bar. |
| SearchResultsPage   | Shows tracks based on selected mood/genre or search query. |
| NowPlayingBar      | Displays detailed info of currently playing track or album. |
| NotFoundPage        | Fallback route for undefined paths. |
| Logo                | Displays the EchoDust logo. |
| MoodGenreSelector   | Dropdown selector to browse tracks by mood or genre. |
| TrackCard           | Reusable component showing album art, title, artist, and play button. |
| NowPlayingBar       | Persistent bottom bar with current track info and playback controls. |
| BackHomeButton      | Left-arrow and "Back Home" text for navigation. |
| HamburgerMenu       | Mobile-only menu for navigation and search. |

---

## 📱 Mobile vs Web Differences

| Element       | Web                           | Mobile                         |
|---------------|-------------------------------|-------------------------------|
| Navigation    | Top navigation + dropdowns    | Hamburger menu with slide-out |
| Mood/Genre    | Inline next to logo           | Vertically stacked below logo |
| Search        | Top-right bar                 | In hamburger menu             |
| NowPlayingBar | Always visible                | Always visible, mobile-optimized |
| TrackList     | Grid layout                   | Vertical scrolling            |

---

## 🔁 User Flow Summary

### 🌐 Web
1. **Home Page**
   - View mood/genre options
   - See “Popular Right Now” list
   - Persistent player bar at bottom
2. **Discover via Mood/Genre**
   - Select mood/genre from dropdown
   - Redirect to SearchResultsPage
3. **Search by Query**
   - Type in search bar
   - Show matching results
4. **Play Track**
   - Click play on TrackCard
   - Track info updates in NowPlayingBar
5. **Now Playing**
   - Click album art → NowPlayingPage
   - Show full album art + tracklist

### 📱 Mobile
1. **Home Page**
   - Vertical stack of mood/genre
   - Hamburger menu icon for navigation
2. **Hamburger Menu**
   - Slide-out panel with search + nav links
3. **Search**
   - Search inside hamburger panel
4. **Track Playback**
   - Play updates bottom bar
   - Tap album art → NowPlaying view
5. **Now Playing Page**
   - Large album art + vertical tracklist
   - Persistent player bar + back button

---

### 🚀 Getting Started

#### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

#### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/echodust-music-player.git
   cd echodust-music-player


2. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

#### Running the App

To start the development server:

```bash
cd frontend
npm run dev


---

### 📂 Project Structure


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
