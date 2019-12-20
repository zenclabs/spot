// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#openapi-object
export interface OpenApiV3 {
  openapi: "3.0.2";
  info: InfoObject;
  servers?: ServerObject[];
  paths: PathsObject;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#info-object
export interface InfoObject {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: string;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#contact-object
export interface ContactObject {
  name?: string;
  url?: string;
  email?: string;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#license-object
export interface LicenseObject {
  name: string;
  url?: string;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#server-object
export interface ServerObject {
  url: string;
  description?: string;
  variables?: { [serverVariable: string]: ServerVariableObject };
}

// https://github.com/OAI/OpenAPI-Specification/blob/3.0.2/versions/3.0.2.md#serverVariableObject
export interface ServerVariableObject {
  enum?: string[];
  default: string;
  description?: string;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#pathsObject
export interface PathsObject {
  [path: string]: PathItemObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#pathItemObject
export interface PathItemObject {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: ServerObject[];
  parameters: Array<ParameterObject | ReferenceObject>;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#operationObject
export interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  parameters?: Array<ParameterObject | ReferenceObject>;
  requestBody?: RequestBodyObject | ReferenceObject;
  responses: ResponsesObject;
  callbacks?: { [callback: string]: CallbackObject | ReferenceObject };
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#referenceObject
export interface ReferenceObject {
  $ref: string;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#requestBodyObject
export interface RequestBodyObject {
  description?: string;
  content: { [mediaType: string]: MediaTypeObject };
  required: boolean;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#mediaTypeObject
export interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: { [example: string]: ExampleObject | ReferenceObject };
  encoding?: { [encoding: string]: EncodingObject };
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#schemaObject
export type SchemaObject =
  | NumberSchemaObject
  | IntegerSchemaObject
  | StringSchemaObject
  | BooleanSchemaObject
  | ArraySchemaObject
  | ObjectSchemaObject
  | AnySchemaObject
  | AllOfSchemaObject
  | OneOfSchemaObject
  | AnyOfSchemaObject
  | NotSchemaObject;

interface SchemaObjectBase {
  nullable?: boolean;
  not?: SchemaObject | ReferenceObject;
  title?: string;
  description?: string;
  example?: any;
  externalDocs?: ExternalDocumentationObject;
  deprecated?: boolean;
}

export interface NumberSchemaObject
  extends SchemaObjectBase,
    NumberSchemaObjectBase {
  type: "number";
  format?: "float" | "double";
}

export interface IntegerSchemaObject
  extends SchemaObjectBase,
    NumberSchemaObjectBase {
  type: "integer";
  format?: "int32" | "int64";
}

interface NumberSchemaObjectBase {
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  multipleOf?: number;
  enum?: number[];
  default?: number;
}

export interface StringSchemaObject extends SchemaObjectBase {
  type: "string";
  maxLength?: number;
  minLength?: number;
  format?: string;
  pattern?: string;
  enum?: string[];
  default?: string;
}

export interface BooleanSchemaObject extends SchemaObjectBase {
  type: "boolean";
  enum?: boolean[];
  default?: boolean;
}

export interface ArraySchemaObject extends SchemaObjectBase {
  type: "array";
  items: SchemaObject | ReferenceObject;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  default?: any[];
}

export interface ObjectSchemaObject extends SchemaObjectBase {
  type: "object";
  properties?: ObjectPropertiesSchemaObject;
  required?: string[];
  additionalProperties?: SchemaObject | ReferenceObject | boolean;
  maxProperties?: number;
  minProperties?: number;
  default?: any;
}

export interface ObjectPropertiesSchemaObject {
  [name: string]:
    | (SchemaObject & ObjectPropertySchemaObjectBase)
    | ReferenceObject;
}

interface ObjectPropertySchemaObjectBase {
  xml?: XmlObject;
  readOnly?: boolean;
  writeOnly?: boolean;
}

export interface AnySchemaObject extends SchemaObjectBase {
  AnyValue: {};
}

export interface AllOfSchemaObject extends SchemaObjectBase {
  allOf: Array<SchemaObject | ReferenceObject>;
}

export interface OneOfSchemaObject extends SchemaObjectBase {
  oneOf: Array<SchemaObject | ReferenceObject>;
  discriminator?: DiscriminatorObject;
}

export interface AnyOfSchemaObject extends SchemaObjectBase {
  anyOf: Array<SchemaObject | ReferenceObject>;
  discriminator?: DiscriminatorObject;
}

export interface NotSchemaObject extends SchemaObjectBase {
  not: SchemaObject | ReferenceObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#discriminatorObject
export interface DiscriminatorObject {
  propertyName: string;
  mapping?: { [key: string]: string };
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securitySchemeObject
export type SecuritySchemeObject =
  | ApiKeySecuritySchemeObject
  | HttpSecuritySchemeObject
  | OAuth2SecuritySchemeObject
  | OpenIdConnectSecuritySchemeObject;

export interface ApiKeySecuritySchemeObject extends SecuritySchemeObjectBase {
  type: "apiKey";
  name: string;
  in: "query" | "header" | "cookie";
}

export interface HttpSecuritySchemeObject extends SecuritySchemeObjectBase {
  type: "http";
  scheme: string;
  bearerFormat?: string;
}

export interface OAuth2SecuritySchemeObject extends SecuritySchemeObjectBase {
  type: "oauth2";
  flows: OAuthFlowsObject;
}

export interface OpenIdConnectSecuritySchemeObject
  extends SecuritySchemeObjectBase {
  type: "openIdConnect";
  openIdConnectUrl: string;
}

interface SecuritySchemeObjectBase {
  type: SecuritySchemeType;
  description?: string;
}

type SecuritySchemeType = "apiKey" | "http" | "oauth2" | "openIdConnect";

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#oauthFlowsObject
export interface OAuthFlowsObject {
  implicit?: ImplicitOAuthFlowObject;
  password?: PasswordOAuthFlowObject;
  clientCredentials?: ClientCredentialsOAuthFlowObject;
  authorizationCode?: AuthorizationCodeOAuthFlowObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#oauthFlowObject
export interface ImplicitOAuthFlowObject extends OAuthFlowObjectBase {
  authorizationUrl: string;
}

export interface PasswordOAuthFlowObject extends OAuthFlowObjectBase {
  tokenUrl: string;
}

export interface ClientCredentialsOAuthFlowObject extends OAuthFlowObjectBase {
  tokenUrl: string;
}

export interface AuthorizationCodeOAuthFlowObject extends OAuthFlowObjectBase {
  authorizationUrl: string;
  tokenUrl: string;
}

interface OAuthFlowObjectBase {
  refreshUrl?: string;
  scopes: { [scope: string]: string };
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securityRequirementObject
export interface SecurityRequirementObject {
  [name: string]: string[];
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#componentsObject
export interface ComponentsObject {
  schemas?: { [schema: string]: SchemaObject | ReferenceObject };
  responses?: { [response: string]: ResponseObject | ReferenceObject };
  parameters?: { [parameter: string]: ParameterObject | ReferenceObject };
  examples?: { [example: string]: ExampleObject | ReferenceObject };
  requestBodies?: { [request: string]: RequestBodyObject | ReferenceObject };
  headers?: { [header: string]: HeaderObject | ReferenceObject };
  securitySchemes?: {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
  };
  links?: { [link: string]: LinkObject | ReferenceObject };
  callbacks?: { [callback: string]: CallbackObject | ReferenceObject };
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#xmlObject
export interface XmlObject {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#exampleObject
export interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#encoding-object
export interface EncodingObject {
  contentType?: string;
  headers?: { [name: string]: HeaderObject | ReferenceObject };
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#responsesObject
export interface ResponsesObject {
  [statusCodeOrDefault: string]: ResponseObject | ReferenceObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#responseObject
export interface ResponseObject {
  description: string;
  headers?: { [name: string]: HeaderObject | ReferenceObject };
  content?: { [mediaType: string]: MediaTypeObject };
  links?: { [link: string]: LinkObject | ReferenceObject };
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#parameterObject
export interface ParameterObject extends ParameterObjectBase {
  name: string;
  in: "query" | "header" | "path" | "cookie";
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#headerObject
export type HeaderObject = ParameterObjectBase;

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#callbackObject
export interface CallbackObject {
  [name: string]: PathItemObject;
}

export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: { [name: string]: any };
  requestBody?: any;
  description?: string;
  server?: ServerObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#tagObject
export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#externalDocumentationObject
export interface ExternalDocumentationObject {
  description?: string;
  url: string;
}

interface ParameterObjectBase {
  description?: string;
  required?: boolean; // must be true for "path"
  deprecated?: boolean;
  allowEmptyValue?: boolean;

  style?: ParameterStyle;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: { [example: string]: ExampleObject | ReferenceObject };
}

export type ParameterStyle =
  | "matrix"
  | "label"
  | "form"
  | "simple"
  | "spaceDelimited"
  | "pipeDelimited"
  | "deepObject";
