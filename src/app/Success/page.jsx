import Header from "../../components/Header/Header";
import PaymentSuccess from "../../components/Success/Success"
import Footer from "../../components/Footer/Footer"

export default function Ab() {
  return (
    <main class="flex flex-col h-dvh ">
      <Header/>
      <PaymentSuccess/>
      <Footer/>
    </main>
  );
}