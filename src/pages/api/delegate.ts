import {
  BlockfrostProvider,
  keepRelevant,
  MeshTxBuilder,
  Quantity,
  Unit,
  UTxO,
} from "@meshsdk/core";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { utxos, dRepId, rewardAddress, changeAddress } = req.body as {
      utxos: UTxO[];
      dRepId: string;
      rewardAddress: string;
      changeAddress: string;
    };

    const assetMap = new Map<Unit, Quantity>();
    assetMap.set("lovelace", "5000000");
    const selectedUtxos = keepRelevant(assetMap, utxos);

    const blockchainProvider = new BlockfrostProvider(
      "mainnetFkdHcirrI4dfLcXPSbILJJy9ToANk4uY",
    );

    const txBuilder = new MeshTxBuilder({
      evaluator: blockchainProvider,
      fetcher: blockchainProvider,
      verbose: true,
    });

    for (const utxo of selectedUtxos) {
      txBuilder.txIn(
        utxo.input.txHash,
        utxo.input.outputIndex,
        utxo.output.amount,
        utxo.output.address,
      );
    }

    txBuilder
      .registerStakeCertificate(rewardAddress)
      .voteDelegationCertificate(
        {
          dRepId,
        },
        rewardAddress!,
      )
      .changeAddress(changeAddress);

    const unsignedTx = await txBuilder.complete();
    res.status(200).json({ cbor: unsignedTx });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
