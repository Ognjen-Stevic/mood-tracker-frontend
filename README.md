# React Mood Tracker 🌤️

A **React** app for tracking mood with **CRUD** features, a **weekly chart** (shown only if there are entries in the last 7 days), and **random tips** to help improve mood.

---

## 📌 Features

* Create, read, update, and delete mood entries (CRUD)
* Enter mood via an **emoji scale 1–5** (1 = very low, 5 = excellent) + optional note
* **Automatic tip** shown when the mood score is **< 3**
* **Manual random tip** available at any time via a button
* **Weekly chart** for the last 7 days (renders only if data exists)
* Data stored via **REST API** (optional)
* **Filter** inputs by date
* Add and remove data from **Favorite** list

---

## 🛠️ Tech Stack

* **React** (SPA)
* **Vite** (dev server/build)
* **Recharts** (charts)
* **JavaScript**
* **REST API** (available on my GitHub too)

---

## 📂 Project Structure (example)

* `components/` – UI components

  * `Home/` – home navigation page
  * `MoodInput/` – emoji input (1–5) + note
  * `MoodList/` – mood card, date filter component, and list of all entries (also used for displaying favorites only)
  * `Report/` – weekly chart
* `Util.jsx` – helpers (fixing date format)
* `App.jsx`, `main.jsx` – app entry points

---

## 💡 Notes

* The chart is rendered **only** if there is at least one daily entry within the last 7 days.
* When a user submits a mood **< 3**, the app automatically shows a **random tip**; you can also request a tip at any time.
