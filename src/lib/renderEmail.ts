import "server-only";
import { renderToMjml } from "@faire/mjml-react/utils/renderToMjml";
import React from "react";
// Use Node's resolver instead of Next/Webpack

export async function renderReactToHtml(email: React.ReactElement) {
  const mjml = renderToMjml(email);

  const { default: mjml2html } = await import("mjml");

  const { html, errors } = mjml2html(mjml, {
    validationLevel: "soft",
    minify: false,
  });

  return { html, errors };
}
