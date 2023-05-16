function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup-card-image ${card.isOpen && "popup_opened"}`}
    >
      <figure className="popup-card-image__figure">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card.link}
          alt={card.name}
          className="popup-card-image__photo"
        />
        <figcaption className="popup-card-image__figcaption">
          {card.name}
        </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
