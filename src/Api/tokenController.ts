export const tokenController = () => {
    const selectedShowroom = localStorage.getItem("selectedShowroom");

    if (selectedShowroom === "minsk") {
        return localStorage.getItem('fakeTokenMinsk');
    } else if (selectedShowroom === "piaseczno") {
        return localStorage.getItem('fakeTokenPiaseczno')
    } else {
        return null;
    }
}