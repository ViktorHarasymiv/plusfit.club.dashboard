import "./App.css";

import Router from "./Routes/Routes";

function App() {
  return (
    <div
      style={{ background: 'url("/img/wallpaper.jpg")' }}
      className="background_wrapper"
    >
      <Router />
    </div>
  );
}

export default App;
