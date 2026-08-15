import { findPossiblePositions } from "./positionMatcher";
import { position2, position3 } from "../../../../../constants/position";

export function resolvePositions(data) {
  const exact = [...data.exact];

  const resolved = [];

  // Sempre adiciona as posições exatas primeiro.
  exact.forEach((position) => {
    if (!resolved.includes(position)) {
      resolved.push(position);
    }
  });

  // Processa as dicas (hints)
  data.hints.forEach((hint) => {
    const candidates = findPossiblePositions(hint);

    // Se existe pelo menos uma posição exata,
    // usamos position2 para filtrar.
    if (exact.length > 0) {
      const base = exact[0];

      const allowed = position2[base] || [];

      candidates.forEach((candidate) => {
        if (allowed.includes(candidate) && !resolved.includes(candidate)) {
          resolved.push(candidate);
        }
      });

      return;
    }

    // Se não existe posição exata,
    // adiciona todas as posições sugeridas.
    candidates.forEach((candidate) => {
      if (!resolved.includes(candidate)) {
        resolved.push(candidate);
      }
    });
  });

  // Se existem duas posições exatas,
  // usamos position3 para descobrir a terceira.
  if (exact.length >= 2) {
    const base = exact[0];

    const second = exact[1];

    const possibleThird = position3?.[base]?.[second] || [];

    if (possibleThird.length > 0) {
      data.hints.forEach((hint) => {
        const hintCandidates = findPossiblePositions(hint);

        possibleThird.forEach((candidate) => {
          if (
            hintCandidates.includes(candidate) &&
            !resolved.includes(candidate)
          ) {
            resolved.push(candidate);
          }
        });
      });
    }
  }

  return {
    position1: resolved[0] || "---",

    position2: resolved[1] || "---",

    position3: resolved[2] || "---",
  };
}
