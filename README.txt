AERODROME - getting Aerodrome.exe (no scripts to run)

Option A - no install on your PC (GitHub builds it for you)
1. Make a free GitHub account, create a new repository, and upload this whole folder
   (including the hidden .github folder).
2. Open the repo's Actions tab. "Build Aerodrome.exe" runs by itself (about 3 minutes).
3. Open the finished run, download the "Aerodrome-exe" artifact, unzip it.
   You get Aerodrome.exe (one portable file) and a win-unpacked folder.

Option B - on your own PC with Node.js installed
   npm install
   node scripts/vendor.js
   npm run dist
   The exe appears in the dist folder.

F11 toggles fullscreen.
