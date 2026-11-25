import type { FormEvent } from "react";
import { useLocale } from "../i18n/locale";

export const contactEmail = "lautarogiaroli@gmail.com";

const formCopy = {
  en: {
    name: "Name (optional)",
    message: "Message",
    required: "Enter a message.",
    subject: "Portfolio enquiry",
    submit: "Open email draft",
  },
  es: {
    name: "Nombre (opcional)",
    message: "Mensaje",
    required: "Escribí un mensaje.",
    subject: "Consulta por el portfolio",
    submit: "Abrir borrador de correo",
  },
};

export function ContactForm() {
  const copy = formCopy[useLocale()];

  function openContactDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    const message = event.currentTarget.elements.namedItem("message") as HTMLTextAreaElement;
    const messageText = message.value.trim();

    if (!messageText) {
      message.setCustomValidity(copy.required);
      message.reportValidity();
      return;
    }

    const body = [messageText.replace(/\r?\n/g, "\r\n"), name.value.trim()]
      .filter(Boolean)
      .join("\r\n\r\n");
    window.location.assign(`mailto:${contactEmail}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <form className="contact-form" onSubmit={openContactDraft}>
      <label className="contact-field">
        <span className="contact-field__label">{copy.name}</span>
        <input className="contact-field__input" name="name" autoComplete="name" maxLength={100} />
      </label>

      <label className="contact-field">
        <span className="contact-field__label">{copy.message}</span>
        <textarea
          className="contact-field__input contact-field__input--textarea"
          name="message"
          rows={4}
          maxLength={1200}
          required
          onChange={(event) => event.currentTarget.setCustomValidity("")}
        />
      </label>

      <button className="contact-form__submit" type="submit">{copy.submit}</button>
    </form>
  );
}
