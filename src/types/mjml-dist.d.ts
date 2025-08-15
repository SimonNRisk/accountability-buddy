declare module "mjml/dist/mjml.cjs" {
  type MJMLParseResults = { html: string; errors?: unknown[] };
  const mjml2html: (
    mjml: string,
    options?: Record<string, unknown>
  ) => MJMLParseResults;
  export default mjml2html;
}
