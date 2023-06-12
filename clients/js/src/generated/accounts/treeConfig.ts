/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  mapSerializer,
} from '@metaplex-foundation/umi';

export type TreeConfig = Account<TreeConfigAccountData>;

export type TreeConfigAccountData = {
  discriminator: Array<number>;
  treeCreator: PublicKey;
  treeDelegate: PublicKey;
  totalMintCapacity: bigint;
  numMinted: bigint;
  isPublic: boolean;
};

export type TreeConfigAccountDataArgs = {
  treeCreator: PublicKey;
  treeDelegate: PublicKey;
  totalMintCapacity: number | bigint;
  numMinted: number | bigint;
  isPublic: boolean;
};

export function getTreeConfigAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<TreeConfigAccountDataArgs, TreeConfigAccountData> {
  const s = context.serializer;
  return mapSerializer<TreeConfigAccountDataArgs, any, TreeConfigAccountData>(
    s.struct<TreeConfigAccountData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['treeCreator', s.publicKey()],
        ['treeDelegate', s.publicKey()],
        ['totalMintCapacity', s.u64()],
        ['numMinted', s.u64()],
        ['isPublic', s.bool()],
      ],
      { description: 'TreeConfigAccountData' }
    ),
    (value) => ({
      ...value,
      discriminator: [122, 245, 175, 248, 171, 34, 0, 207],
    })
  ) as Serializer<TreeConfigAccountDataArgs, TreeConfigAccountData>;
}

export function deserializeTreeConfig(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): TreeConfig {
  return deserializeAccount(
    rawAccount,
    getTreeConfigAccountDataSerializer(context)
  );
}

export async function fetchTreeConfig(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<TreeConfig> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  assertAccountExists(maybeAccount, 'TreeConfig');
  return deserializeTreeConfig(context, maybeAccount);
}

export async function safeFetchTreeConfig(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey,
  options?: RpcGetAccountOptions
): Promise<TreeConfig | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey, options);
  return maybeAccount.exists
    ? deserializeTreeConfig(context, maybeAccount)
    : null;
}

export async function fetchAllTreeConfig(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<TreeConfig[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'TreeConfig');
    return deserializeTreeConfig(context, maybeAccount);
  });
}

export async function safeFetchAllTreeConfig(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKeys: PublicKey[],
  options?: RpcGetAccountsOptions
): Promise<TreeConfig[]> {
  const maybeAccounts = await context.rpc.getAccounts(publicKeys, options);
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeTreeConfig(context, maybeAccount as RpcAccount)
    );
}

export function getTreeConfigGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>
) {
  const s = context.serializer;
  const programId = context.programs.getPublicKey(
    'mplBubblegum',
    'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Array<number>;
      treeCreator: PublicKey;
      treeDelegate: PublicKey;
      totalMintCapacity: number | bigint;
      numMinted: number | bigint;
      isPublic: boolean;
    }>({
      discriminator: [0, s.array(s.u8(), { size: 8 })],
      treeCreator: [8, s.publicKey()],
      treeDelegate: [40, s.publicKey()],
      totalMintCapacity: [72, s.u64()],
      numMinted: [80, s.u64()],
      isPublic: [88, s.bool()],
    })
    .deserializeUsing<TreeConfig>((account) =>
      deserializeTreeConfig(context, account)
    )
    .whereField('discriminator', [122, 245, 175, 248, 171, 34, 0, 207]);
}

export function getTreeConfigSize(): number {
  return 89;
}
