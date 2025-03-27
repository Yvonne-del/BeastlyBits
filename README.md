# 🐾 PawPrint - Animal Awareness Web App
PawPrint is a fun little web app that showcases different animals categorized into mammals, birds, reptiles, fish, and insects. The goal is to create awareness about animals, their habitats, and some fun facts.

You can browse through different categories, like animals, and even save your favorites! 🦁🐦🐠

🌟 Features
✅ Explore Animals – Browse animals grouped by their habitat.
✅ See More Details – Click on an animal to get more info about it.
✅ Like & Unlike – Love an animal? Click the "Like" button! Changed your mind? Unlike it anytime.
✅ Personal Liked Section – All liked animals are saved separately.
✅ Smooth & Fast – No page reloads, everything updates dynamically.

# 🛠 Tech Used
HTML, CSS, JavaScript (Frontend)

JSON Server (Fake backend using db.json)

Local Storage (For saving liked animals)

# Link to live site
https://paw-print-delta.vercel.app/

# 🚀 How to Run This Project
1️⃣ Clone this repo:

    git clone https://github.com/your-username/pawprint.git
    cd pawprint


2️⃣ Install JSON Server (if you don’t have it yet):

    npm install -g json-server

3️⃣ Start the backend:

    json-server --watch db.json --port 3000

4️⃣ Open index.html in your browser (or use Live Server in VS Code).

That’s it! You should now see the list of animals. 🎉

# 📂 Project Structure

📦 PawPrint
├── 📜 index.html    # Main page
├── 📜 styles.css    # Styling
├── 📜 script.js     # JavaScript logic
├── 📜 db.json       # Fake database
└── 📜 README.md     # This file!

# 🤔 How to Use
Click on an animal to see more details about it.

Hit "Like" if you love an animal (it'll turn green).

Check the Liked section to see your saved animals.

Unlike an animal anytime by clicking "Remove Like."

# 🐞 Common Issues & Fixes
❌ Animal Details Not Showing?
Make sure #animal-details exists in index.html.

Open DevTools (F12 > Console) and check for errors.

❌ Changes Not Saving?
Make sure JSON Server is running (json-server --watch db.json --port 3000).

Try clearing local storage: Open DevTools → Console → Type localStorage.clear() and press Enter.

# 🔮 Future Plans
💡 Search feature to find animals faster.
💡 Maybe let users upload their own animal pictures?
💡 Add conservation statuses (so we know which animals need our help).

# ✨ Creator
Made with ❤️ by Yvonne Nyambura

# 📜 License
This project is open-source under the MIT License.