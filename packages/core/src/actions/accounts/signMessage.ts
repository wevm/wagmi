import type { SignMessageReturnType, SignMessageParameters } from "viem";
import { ConnectorNotFoundError } from "../../errors";
import { getWalletClient } from "../viem";

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: SignMessageParameters["message"];
};

export type SignMessageResult = SignMessageReturnType;

export async function signMessage(
    args: SignMessageArgs
): Promise<SignMessageResult> {
  const walletClient = await getWalletClient();
  if (!walletClient) throw new ConnectorNotFoundError();
  return await walletClient.signMessage({
    message: args.message,
  });
}
