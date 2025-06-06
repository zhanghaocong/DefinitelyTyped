import type { JSResourceReference } from "./JSResourceReference";
import type { ConcreteRequest } from "./RelayConcreteNode";

/**
 * Represents a single operation used to processing and normalize runtime
 * request results.
 */
export interface NormalizationOperation {
    readonly kind: "Operation";
    readonly name: string;
    readonly argumentDefinitions: readonly NormalizationLocalArgumentDefinition[];
    readonly selections: readonly NormalizationSelection[];
    readonly clientAbstractTypes?: {
        readonly [key: string]: readonly string[];
    };
}

export type NormalizationHandle = NormalizationScalarHandle | NormalizationLinkedHandle;

export interface NormalizationLinkedHandle {
    readonly kind: "LinkedHandle";
    readonly alias?: string | null | undefined;
    readonly name: string;
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly handle: string;
    readonly key: string;
    // NOTE: this property is optional because it's expected to be rarely used
    readonly dynamicKey?: NormalizationArgument | null | undefined;
    readonly filters?: readonly string[] | null | undefined;
    readonly handleArgs?: readonly NormalizationArgument[];
}

export interface NormalizationScalarHandle {
    readonly kind: "ScalarHandle";
    readonly alias?: string | null | undefined;
    readonly name: string;
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly handle: string;
    readonly key: string;
    // NOTE: this property is optional because it's expected to be rarely used
    readonly dynamicKey?: NormalizationArgument | null | undefined;
    readonly filters?: readonly string[] | null | undefined;
    readonly handleArgs?: readonly NormalizationArgument[];
}

export type NormalizationArgument =
    | NormalizationListValueArgument
    | NormalizationLiteralArgument
    | NormalizationObjectValueArgument
    | NormalizationVariableArgument;

export interface NormalizationCondition {
    readonly kind: "Condition";
    readonly passingValue: boolean;
    readonly condition: string;
    readonly selections: readonly NormalizationSelection[];
}

export interface NormalizationClientExtension {
    readonly kind: "ClientExtension";
    readonly selections: readonly NormalizationSelection[];
}

export type NormalizationField = NormalizationFlightField | NormalizationScalarField | NormalizationLinkedField;

export interface NormalizationInlineFragment {
    readonly kind: "InlineFragment";
    readonly selections: readonly NormalizationSelection[];
    readonly type: string;
    readonly abstractKey?: string | null | undefined;
}

export interface NormalizationFragmentSpread {
    readonly kind: "FragmentSpread";
    readonly fragment: NormalizationSplitOperation;
    readonly args?: readonly NormalizationArgument[] | null | undefined;
}

export interface NormalizationLinkedField {
    readonly kind: "LinkedField";
    readonly alias?: string | null | undefined;
    readonly name: string;
    readonly storageKey?: string | null | undefined;
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly concreteType?: string | null | undefined;
    readonly plural: boolean;
    readonly selections: readonly NormalizationSelection[];
}

export interface NormalizationActorChange {
    readonly kind: "ActorChange";
    readonly linkedField: NormalizationLinkedField;
}

export interface NormalizationModuleImport {
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly kind: "ModuleImport";
    readonly documentName: string;
    readonly fragmentPropName: string;
    readonly fragmentName: string;
    readonly componentModuleProvider?: () => unknown | Promise<unknown> | JSResourceReference<unknown>;
    readonly operationModuleProvider?: () =>
        | NormalizationRootNode
        | Promise<NormalizationRootNode>
        | JSResourceReference<NormalizationRootNode>;
}

export interface NormalizationListValueArgument {
    readonly kind: "ListValue";
    readonly name: string;
    readonly items: ReadonlyArray<NormalizationArgument | null>;
}

export interface NormalizationLiteralArgument {
    readonly kind: "Literal";
    readonly name: string;
    readonly type?: string | null | undefined;
    readonly value: any;
}

export interface NormalizationLocalArgumentDefinition {
    readonly kind: "LocalArgument";
    readonly name: string;
    readonly defaultValue: any;
}

export type NormalizationNode =
    | NormalizationClientExtension
    | NormalizationCondition
    | NormalizationDefer
    | NormalizationInlineFragment
    | NormalizationLinkedField
    | NormalizationOperation
    | NormalizationSplitOperation
    | NormalizationStream;

export interface NormalizationScalarField {
    readonly kind: "ScalarField";
    readonly alias?: string | null | undefined;
    readonly name: string;
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly storageKey?: string | null | undefined;
}

export interface NormalizationFlightField {
    readonly kind: "FlightField";
    readonly alias?: string | null | undefined;
    readonly name: string;
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly storageKey: string | null | undefined;
}

export interface NormalizationClientComponent {
    readonly args?: readonly NormalizationArgument[] | null | undefined;
    readonly kind: "ClientComponent";
    readonly fragment: NormalizationNode;
}

export interface NormalizationTypeDiscriminator {
    readonly kind: "TypeDiscriminator";
    readonly abstractKey: string;
}

export type NormalizationSelection =
    | NormalizationCondition
    | NormalizationClientComponent
    | NormalizationClientExtension
    | NormalizationDefer
    | NormalizationField
    | NormalizationFlightField
    | NormalizationFragmentSpread
    | NormalizationHandle
    | NormalizationInlineFragment
    | NormalizationModuleImport
    | NormalizationStream
    | NormalizationActorChange
    | NormalizationTypeDiscriminator;

export interface NormalizationSplitOperation {
    readonly argumentDefinitions?: readonly NormalizationLocalArgumentDefinition[];
    readonly kind: "SplitOperation";
    readonly name: string;
    readonly metadata: { readonly [key: string]: unknown } | null | undefined;
    readonly selections: readonly NormalizationSelection[];
}

export interface NormalizationStream {
    readonly if: string | null;
    readonly kind: "Stream";
    readonly label: string;
    readonly selections: readonly NormalizationSelection[];
}

export interface NormalizationDefer {
    readonly if: string | null;
    readonly kind: "Defer";
    readonly label: string;
    readonly selections: readonly NormalizationSelection[];
}

export interface NormalizationVariableArgument {
    readonly kind: "Variable";
    readonly name: string;
    readonly type?: string | null | undefined;
    readonly variableName: string;
}

export interface NormalizationObjectValueArgument {
    readonly kind: "ObjectValue";
    readonly name: string;
    readonly fields: readonly NormalizationArgument[];
}

export type NormalizationSelectableNode =
    | NormalizationDefer
    | NormalizationLinkedField
    | NormalizationOperation
    | NormalizationSplitOperation
    | NormalizationStream;

export type NormalizationRootNode = ConcreteRequest | NormalizationSplitOperation;
