import type { FormEvent } from "react";

export const contactEmail = "lautarogiaroli@gmail.com";

function openContactDraft(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const name = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
  const message = event.currentTarget.elements.namedItem("message") as HTMLTextAreaElement;
  const messageText = message.value.trim();

  if (!messageText) {
    message.setCustomValidity("Enter a message.");
    message.reportValidity();
    return;
  }

  const body = [messageText.replace(/\r?\n/g, "\r\n"), name.value.trim()]
    .filter(Boolean)
    .join("\r\n\r\n");
  window.location.assign(`mailto:${contactEmail}?subject=Portfolio%20enquiry&body=${encodeURIComponent(body)}`);
}

export function ContactForm() {
  return (
    <form className="contact-form" onSubmit={openContactDraft}>
      <label className="contact-field">
        <span className="contact-field__label">Name (optional)</span>
        <input className="contact-field__input" name="name" autoComplete="name" maxLength={100} />
      </label>

      <label className="contact-field">
        <span className="contact-field__label">Message</span>
        <textarea
          className="contact-field__input contact-field__input--textarea"
          name="message"
          rows={4}
          maxLength={1200}
          required
          onChange={(event) => event.currentTarget.setCustomValidity("")}
        />
      </label>

      <button className="contact-form__submit" type="submit">Open email draft</button>
    </form>
  );
}
