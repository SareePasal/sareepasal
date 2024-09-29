import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar"
import Footer from "../../components/Footer/Footer"

export default function Calendars() {
  return (
    <main class="flex flex-col overflow-hidden">
      <Header/>
      <Calendar/>
      <Footer/>
    </main>
  );
}
