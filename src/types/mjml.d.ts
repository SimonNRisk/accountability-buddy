declare module "mjml" {
  import type { MJMLParseResults } from "mjml-core";

  interface MJMLOptions {
    validationLevel?: "strict" | "soft" | "skip";
    minify?: boolean;
    keepComments?: boolean;
    [key: string]: unknown;
  }

  export default function mjml2html(
    mjml: string,
    options?: MJMLOptions
  ): MJMLParseResults;
}
