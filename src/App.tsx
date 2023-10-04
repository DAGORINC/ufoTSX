import './App.css';
import CookieConsent from 'react-cookie-consent';
import Router from './navigation/Router';

function App() {

  const handleCookieAccept = () => {
    localStorage.setItem("ufoCookiePolicy", "true");
  };
  
  return (
    <div className="generalView">

      <CookieConsent
        location="bottom"
        buttonText="Akceptuj"
        cookieName="ufoCookiePolicy"
        expires={150}
        onAccept={handleCookieAccept}
        style={{ backgroundColor: 'white', borderTop: '1px solid lightgray', color: 'black' }}
      >
        Ta strona wykorzystuje pliki cookie.
        Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu oraz do prowadzenia statystyk.
        Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies kliknij "Akceptuj"
        Jeśli nie wyrażasz zgody, ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.
      </CookieConsent>

      <Router />
    </div>
  );
}

export default App;
