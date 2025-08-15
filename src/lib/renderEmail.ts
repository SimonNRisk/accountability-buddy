import { renderToMjml } from "@faire/mjml-react/utils/renderToMjml";
import mjml2html from "mjml";
import React from "react";

export function renderReactToHtml(email: React.ReactElement) {
  // Compile React components -> MJML -> HTML
  const mjml = renderToMjml(email);
  const { html, errors } = mjml2html(mjml, {
    validationLevel: "soft",
    minify: false, // avoid vulnerable html-minifier path
  });
  return { html, errors };
}
