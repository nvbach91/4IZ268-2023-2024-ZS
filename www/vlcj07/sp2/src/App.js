import Header from "./components/Header";
import Footer from "./components/Footer";
import Finder from "./components/Finder";
import Collection from "./components/Collection";
import { useState } from "react";

import { Route, Routes } from "react-router-dom";

export default function App() {

  const [savedBooks, setSavedBooks] = useState([]);

  return (
    <div id="app" className="bg-slate-50 text-lg min-h-screen">
      <Header />
      <main className="max-w-4xl my-0 mx-auto">
        <Routes>
          <Route path="/" index element={<Finder savedBooks={savedBooks} setSavedBooks={setSavedBooks} />} />
          <Route path="finder" index element={<Finder savedBooks={savedBooks} setSavedBooks={setSavedBooks} />} />
          <Route path="collection" element={<Collection savedBooks={savedBooks} setSavedBooks={setSavedBooks} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
