declare module "mjml/dist/mjml.cjs" {
  // Minimal typing for our use
  type MJMLParseResults = { html: string; errors?: any[] };
  const mjml2html: (
    mjml: string,
    options?: Record<string, any>
  ) => MJMLParseResults;
  export default mjml2html;
}
