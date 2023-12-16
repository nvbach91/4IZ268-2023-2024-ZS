import Header from "./components/Header";
import Footer from "./components/Footer";
import Finder from "./components/Finder";
import Collection from "./components/Collection";

export default function App() {
  return (
    <div id="app" className="bg-slate-50 text-lg min-h-screen">
      <Header />
      <main className="max-w-4xl my-0 mx-auto">
        <Finder />
        <Collection />
      </main>
      <Footer />
    </div>
  );
}
