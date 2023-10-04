export function getShowroomUrl() {
    const selectedShowroom = localStorage.getItem("selectedShowroom");
  
    if (selectedShowroom === "minsk") {
      // return 'http://192.168.8.173:3002/';
      return 'https://www.ufo-meble.pl:4000/';
    } else if (selectedShowroom === "piaseczno") {
        // return 'http://192.168.8.173:3002/';
        return 'https://www.ufo-meble.pl:4001/';
    } else if (window.location.pathname !== "/wybierz-salon") {
        window.location.href = "/wybierz-salon";
      return null;
    } else {
      return null;
    }
  }