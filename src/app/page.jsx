import Header from "../components/Header/Header";
import Body from "../components/Body/Body"
import Footer from "../components/Footer/Footer"

export default function Home() {
  return (
    <main class="flex flex-col">
      <Header/>
      <Body/>
      <Footer/>
    </main>
  );
}
