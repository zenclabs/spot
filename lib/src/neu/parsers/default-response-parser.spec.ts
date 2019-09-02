import { createExistingSourceFile } from "../../spec-helpers/helper";
import { LociTable } from "../locations";
import { TypeKind, TypeTable } from "../types";
import { parseDefaultResponse } from "./default-response-parser";

describe("default response parser", () => {
  const exampleFile = createExistingSourceFile(
    `${__dirname}/__spec-examples__/default-response.ts`
  );
  const klass = exampleFile.getClassOrThrow("DefaultResponseClass");

  let typeTable: TypeTable;
  let lociTable: LociTable;

  beforeEach(() => {
    typeTable = new TypeTable();
    lociTable = new LociTable();
  });

  test("parses @defaultResponse decorated method", () => {
    const result = parseDefaultResponse(
      klass.getMethodOrThrow("defaultResponse"),
      typeTable,
      lociTable
    );

    expect(result).toStrictEqual({
      body: {
        type: { kind: TypeKind.STRING }
      },
      description: "default response description",
      headers: [
        {
          description: undefined,
          name: "property",
          optional: false,
          type: { kind: TypeKind.STRING }
        }
      ]
    });
  });

  test("parses parameterless @defaultResponse decorated method", () => {
    const result = parseDefaultResponse(
      klass.getMethodOrThrow("parameterlessDefaultResponse"),
      typeTable,
      lociTable
    );

    expect(result).toStrictEqual({
      body: undefined,
      description: undefined,
      headers: []
    });
  });

  test("fails to parse non-@defaultResponse decorated method", () => {
    expect(() =>
      parseDefaultResponse(
        klass.getMethodOrThrow("notDefaultResponse"),
        typeTable,
        lociTable
      )
    ).toThrowError("Expected to find decorator named 'defaultResponse'");
  });
});
