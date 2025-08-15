declare module "mjml" {
  import { MJMLParseResults } from "mjml-core";
  export default function mjml2html(
    mjml: string,
    options?: Record<string, any>
  ): MJMLParseResults;
}
