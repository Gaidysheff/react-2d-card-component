export const TRANSLATIONS = {
  en: {
    // ---form---
    number: "Card Number",
    number_tooltip:
      "If your card number has 19 digits, please, enter additional 3 digits over here.",
    name: "Cardholder's name",
    cvc: "CVC",
    pay: "Pay",
    fill: "Fill in the card details",
    valid: "valid thru",
    // ------
    slider_hue: "Hue",
    slider_lightness: "Lightness",
    slider_chroma: "Chroma",
    slider_reset: "Reset to original color",
    language: "Language",
    result:
      "Your card details have been conditionally transferred to the server.",
  },
  ru: {
    // ---form---
    number: "Номер карты",
    number_tooltip:
      "Если Ваша карта содержит 19 цифр, пожайлуста, введите здесь дополнительный 3 цифры.",
    name: "Имя владельца карты",
    cvc: "код",
    pay: "Оплатить",
    fill: "Заполните данные карты",
    valid: "срок",
    // ------
    slider_hue: "Тон",
    slider_lightness: "Освещение",
    slider_chroma: "Насыщенность",
    slider_reset: "Сбросить до исходного цвета",
    language: "Язык",
    result: "Данные вашей карты условно переданы на сервер.",
  },
};

export const ERRORS = {
  en: {
    no_of_digits: "Must be 4 digits.",
    additional_digits: "Must be 3 digits if used",
    required: "This field is required.",
    two_chars: "Name must be at least 2 characters.",
    latin_chars: "String must contain only Latin letters",
    cvc_digits: "CVC must contain only digits.",
    cvc_three: "CVC must be 3 digits.",
  },
  ru: {
    no_of_digits: "Должно содержаться 4 цифры.",
    additional_digits: "Должно быть 3 цифры, если есть",
    required: "Это поле является обязательным.",
    two_chars: "Имя должно состоять минимум из 2 букв.",
    latin_chars: "Строка должна содержать только латинские буквы.",
    cvc_digits: "Код должен содержать только цифры.",
    cvc_three: "Код должен содержать 3 цифры.",
  },
};
