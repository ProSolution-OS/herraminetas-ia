export function llmCost({ inputTokens, outputTokens, inputPricePerM, outputPricePerM }) {
  for (const v of [inputTokens, outputTokens, inputPricePerM, outputPricePerM]) {
    if (!Number.isFinite(v) || v < 0) throw new RangeError('Los valores deben ser números finitos y no negativos');
  }
  return (inputTokens / 1e6) * inputPricePerM + (outputTokens / 1e6) * outputPricePerM;
}
