import { useEffect, useId, useRef, useState } from "react";

const STARTER_FORM = {
  name: "",
  artist: "",
  description: "",
  genre: "Jazz",
  year: new Date().getFullYear(),
  price: "",
  origin: "",
  image: "",
  inStock: true,
};

function ProductForm({ onSubmit, submitLabel = "Add record" }) {
  const nameId = useId();
  const artistId = useId();
  const descriptionId = useId();
  const genreId = useId();
  const yearId = useId();
  const priceId = useId();
  const originId = useId();
  const imageId = useId();
  const stockId = useId();
  const firstFieldRef = useRef(null);
  const [form, setForm] = useState(STARTER_FORM);
  const [message, setMessage] = useState("");

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.artist.trim() || !form.price) {
      setMessage("Album title, artist, and price are required.");
      return;
    }

    setMessage("");
    onSubmit({
      ...form,
      year: Number(form.year),
      price: Number(form.price),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label htmlFor={nameId}>Album title</label>
        <input
          id={nameId}
          ref={firstFieldRef}
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form__row">
        <label htmlFor={artistId}>Artist</label>
        <input
          id={artistId}
          name="artist"
          value={form.artist}
          onChange={handleChange}
        />
      </div>

      <div className="form__row">
        <label htmlFor={descriptionId}>Description</label>
        <textarea
          id={descriptionId}
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form__grid">
        <div className="form__row">
          <label htmlFor={genreId}>Genre</label>
          <select id={genreId} name="genre" value={form.genre} onChange={handleChange}>
            <option>Jazz</option>
            <option>Soul</option>
            <option>Hip-Hop</option>
            <option>Rock</option>
            <option>Trip-Hop</option>
            <option>Electronic</option>
          </select>
        </div>

        <div className="form__row">
          <label htmlFor={yearId}>Year</label>
          <input
            id={yearId}
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__grid">
        <div className="form__row">
          <label htmlFor={priceId}>Price</label>
          <input
            id={priceId}
            name="price"
            type="number"
            min="1"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form__row">
          <label htmlFor={originId}>Pressing origin</label>
          <input
            id={originId}
            name="origin"
            value={form.origin}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__row">
        <label htmlFor={imageId}>Sleeve image URL</label>
        <input
          id={imageId}
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form__check">
        <input
          id={stockId}
          name="inStock"
          type="checkbox"
          checked={form.inStock}
          onChange={handleChange}
        />
        <label htmlFor={stockId}>In stock</label>
      </div>

      {message ? <p className="form__error">{message}</p> : null}

      <button className="button" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
