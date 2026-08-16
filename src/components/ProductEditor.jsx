import { useId, useState } from "react";

function ProductEditor({ product, onUpdate, onDelete }) {
  const priceId = useId();
  const nameId = useId();
  const descriptionId = useId();
  const stockId = useId();
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    inStock: product.inStock,
  });
  const [status, setStatus] = useState("");
  const [confirming, setConfirming] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onUpdate({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      inStock: form.inStock,
    });
    setStatus("Saved. The bins are up to date.");
  }

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    await onDelete();
  }

  return (
    <section className="editor">
      <h2>Update this pressing</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label htmlFor={nameId}>Album title</label>
          <input id={nameId} name="name" value={form.name} onChange={handleChange} />
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

        {status ? <p className="form__status">{status}</p> : null}

        <div className="button-row">
          <button className="button" type="submit">
            Save changes
          </button>
          <button
            className="button button--danger"
            type="button"
            onClick={handleDelete}
          >
            {confirming ? "Confirm delete" : "Delete record"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductEditor;
