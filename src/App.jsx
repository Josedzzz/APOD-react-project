import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetched from cache today");
        return;
      }
      localStorage.clear();

      try {
        const url =
          "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;
        let res = await fetch(url);
        let apiData = await res.json();
        if (apiData.hdurl) {
          localStorage.setItem(localKey, JSON.stringify(apiData));
          setData(apiData);
          console.log("Fetched from API today");
        } else {
          const newURL =
            "https://api.nasa.gov/planetary/apod" +
            `?api_key=${NASA_KEY}` +
            "&date=2024-07-26";
          res = await fetch(newURL);
          apiData = await res.json();
          localStorage.setItem(localKey, JSON.stringify(apiData));
          setData(apiData);
          console.log("Fetched from API today");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
