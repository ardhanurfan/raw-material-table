import { X2jOptions, XMLParser } from "fast-xml-parser";

export function xml2json(xmlString: string) {
  // Remove XML declaration if present
  const cleanedXmlString = xmlString.replace(/<\?xml.*?\?>/, "");

  const parserOptions: X2jOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
  };

  const parser = new XMLParser(parserOptions);
  const json = parser.parse(cleanedXmlString);

  return json;
}
``;
