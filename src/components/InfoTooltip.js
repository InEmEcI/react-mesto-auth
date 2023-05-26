function InfoTooltip({ message, onClose }) {
  return (
    <div className={`popup popup__success` + (message ? " popup_opened" : "")}>
      <div className="popup__container popup__container_white">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>

        <p
          className={
            " popup__success-img" +
            (message
              ? message.isSuccess
                ? " popup__success-img_ok"
                : " popup__success-img_fail"
              : "")
          }
        >
          {message ? message.text : ""}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
