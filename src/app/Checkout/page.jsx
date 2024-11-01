import Header from "../../components/Header/Header";
import Checkout from "../../components/Checkout/Checkout"
import Footer from "../../components/Footer/Footer"

export default function CheckoutPage() {
  return (
    <main class="flex flex-col">
      <Header/>
      <Checkout/>
      <Footer/>
    </main>
  );
}
