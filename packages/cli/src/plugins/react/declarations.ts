import ts, { factory } from 'typescript'

////////////////////////////////////////////////////////////////////////////////
// Wagmi

export const wagmiConfigIdentifier = factory.createIdentifier('Config')
export const wagmiConfigImportSpecifier = factory.createImportSpecifier(
  true,
  undefined,
  wagmiConfigIdentifier,
)

export const wagmiResolvedRegisterIdentifier =
  factory.createIdentifier('ResolvedRegister')
export const wagmiResolvedRegisterImportSpecifier =
  factory.createImportSpecifier(
    true,
    undefined,
    wagmiResolvedRegisterIdentifier,
  )

export const wagmiReadContractDataIdentifier =
  factory.createIdentifier('ReadContractData')
export const wagmiReadContractDataImportSpecifier =
  factory.createImportSpecifier(
    true,
    undefined,
    wagmiReadContractDataIdentifier,
  )

////////////////////////////////////////////////////////////////////////////////
// Viem

export const viemAbiIdentifier = factory.createIdentifier('Abi')
export const viemAbiImportSpecifier = factory.createImportSpecifier(
  true,
  undefined,
  viemAbiIdentifier,
)

export const viemContractFunctionNameIdentifier = factory.createIdentifier(
  'ContractFunctionName',
)
export const viemContractFunctionNameImportSpecifier =
  factory.createImportSpecifier(
    true,
    undefined,
    viemContractFunctionNameIdentifier,
  )

export const viemContractFunctionArgsIdentifier = factory.createIdentifier(
  'ContractFunctionArgs',
)
export const viemContractFunctionArgsImportSpecifier =
  factory.createImportSpecifier(
    true,
    undefined,
    viemContractFunctionNameIdentifier,
  )

////////////////////////////////////////////////////////////////////////////////
// Generated

export const abiIdentifier = factory.createIdentifier('abi')
export const functionNameIdentifier = factory.createIdentifier('functionName')
export const argsIdentifier = factory.createIdentifier('args')
export const configIdentifier = factory.createIdentifier('config')
export const selectDataIndentifier = factory.createIdentifier('selectData')

export const pureViewUnionType = factory.createUnionTypeNode([
  factory.createLiteralTypeNode(factory.createStringLiteral('pure')),
  factory.createLiteralTypeNode(factory.createStringLiteral('view')),
])

export const useReadContractParametersTypeAliasDeclarationIdentifier =
  factory.createIdentifier('UseGeneratedReadContractParameters')
export const useReadContractParametersTypeAliasDeclaration =
  factory.createTypeAliasDeclaration(
    [factory.createToken(ts.SyntaxKind.ExportKeyword)],
    useReadContractParametersTypeAliasDeclarationIdentifier,
    [
      factory.createTypeParameterDeclaration(
        undefined,
        abiIdentifier,
        factory.createUnionTypeNode([
          factory.createTypeReferenceNode(viemAbiIdentifier, undefined),
          factory.createTypeOperatorNode(
            ts.SyntaxKind.ReadonlyKeyword,
            factory.createArrayTypeNode(
              factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
            ),
          ),
        ]),
        factory.createTypeReferenceNode(viemAbiIdentifier, undefined),
      ),
      factory.createTypeParameterDeclaration(
        undefined,
        functionNameIdentifier,
        factory.createTypeReferenceNode(viemContractFunctionNameIdentifier, [
          factory.createTypeReferenceNode(abiIdentifier, undefined),
          pureViewUnionType,
        ]),
        factory.createTypeReferenceNode(viemContractFunctionNameIdentifier, [
          factory.createTypeReferenceNode(abiIdentifier, undefined),
          pureViewUnionType,
        ]),
      ),
      factory.createTypeParameterDeclaration(
        undefined,
        argsIdentifier,
        factory.createTypeReferenceNode(viemContractFunctionArgsIdentifier, [
          factory.createTypeReferenceNode(abiIdentifier, undefined),
          pureViewUnionType,
          factory.createTypeReferenceNode(functionNameIdentifier, undefined),
        ]),
        factory.createTypeReferenceNode(viemContractFunctionArgsIdentifier, [
          factory.createTypeReferenceNode(abiIdentifier, undefined),
          pureViewUnionType,
          factory.createTypeReferenceNode(functionNameIdentifier, undefined),
        ]),
      ),
      factory.createTypeParameterDeclaration(
        undefined,
        configIdentifier,
        factory.createTypeReferenceNode(wagmiConfigIdentifier, undefined),
        factory.createTypeReferenceNode(wagmiConfigIdentifier, undefined),
      ),
      factory.createTypeParameterDeclaration(
        undefined,
        factory.createIdentifier('selectData'),
        undefined,
        factory.createTypeReferenceNode(wagmiReadContractDataIdentifier, [
          factory.createTypeReferenceNode(abiIdentifier, undefined),
          factory.createTypeReferenceNode(functionNameIdentifier, undefined),
          factory.createTypeReferenceNode(argsIdentifier, undefined),
        ]),
      ),
    ],
    factory.createTypeLiteralNode([]),
  )
