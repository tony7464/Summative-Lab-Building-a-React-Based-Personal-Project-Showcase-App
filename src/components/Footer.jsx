import { useStore } from "../context/StoreContext";

function Footer() {
  const { store } = useStore();

  return (
    <footer className="footer">
      <p>{store?.name ?? "The Groove Vault"} · Admin portal</p>
      <p>
        {store?.phone_number} · {store?.hours}
      </p>
    </footer>
  );
}

export default Footer;
