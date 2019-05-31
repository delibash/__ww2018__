const FONT_FAMILY = {
  DEFAULT: 'Open Sans, sans-serif',
};

export const StylesConstants = {
  FONT: {
    LIGHT: `
      font-family: ${FONT_FAMILY.DEFAULT};
      font-weight: 100;
    `,
    DEFAULT: `
      font-family: ${FONT_FAMILY.DEFAULT};
      font-weight: 400;
    `,
    BOLD: `
      font-family: ${FONT_FAMILY.DEFAULT};
      font-weight: 700;
    `
  },
  FONT_SIZE: {
    HTML: `
      font-size: 62.5%;
    `,
    DEFAULT: `
      font-size: 1.4rem;
    `
  }
};
