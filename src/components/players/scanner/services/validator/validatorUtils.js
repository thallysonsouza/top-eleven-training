/**
 * Valor utilizado pelo Scanner para representar
 * um dado não reconhecido pelo OCR.
 */
export const INVALID_VALUE = 1;

/**
 * Maior valor de skill conhecido no Top Eleven.
 */
export const MAX_SKILL_VALUE = 450;

/**
 * Verifica se um valor extraído pelo OCR é inválido.
 *
 * São considerados inválidos:
 * - null
 * - undefined
 * - 1 (marcador de erro)
 */
export function isInvalid(value) {
  return value == null || value === INVALID_VALUE;
}

/**
 * Verifica se uma skill extraída pelo OCR
 * precisa ser reconstruída.
 *
 * São consideradas inválidas:
 * - null
 * - undefined
 * - 1 (marcador de erro)
 * - negativas
 * - maiores que o limite conhecido do jogo
 */
export function isInvalidSkill(value) {
  return (
    value == null ||
    value === INVALID_VALUE ||
    value < 0 ||
    value > MAX_SKILL_VALUE
  );
}

/**
 * Compara dois valores.
 *
 * Diferença:
 * 0  -> valid
 * 1  -> warning
 * >1 -> invalid
 */
export function compare(expected, actual) {
  const diff = Math.abs(expected - actual);

  if (diff === 0) return "valid";
  if (diff === 1) return "warning";

  return "invalid";
}

/**
 * Calcula a média arredondada.
 */
export function average(values) {
  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}

/**
 * Distribui um total igualmente entre N posições.
 *
 * Exemplo:
 *
 * total = 281
 * count = 3
 *
 * retorno:
 *
 * [94, 94, 93]
 */
export function distribute(total, count) {
  if (count <= 0) {
    return [];
  }

  const base = Math.floor(total / count);
  const remainder = total - base * count;

  return Array.from(
    { length: count },
    (_, index) => base + (index < remainder ? 1 : 0),
  );
}

/**
 * Verifica se algum valor do objeto é inválido.
 */
export function hasInvalidValues(values) {
  return Object.values(values).some(isInvalid);
}

/**
 * Verifica se um valor calculado está
 * dentro dos limites conhecidos do jogo.
 *
 * Esta função é utilizada apenas para validações
 * externas. O Skill Resolver NÃO deve utilizá-la,
 * pois valores negativos representam inconsistências
 * entre atributos e skills e precisam ser preservados.
 */
export function isValidSkillValue(value) {
  return value !== INVALID_VALUE && value >= 0 && value <= MAX_SKILL_VALUE;
}

/**
 * Sanitiza um valor para armazenamento.
 */
export function sanitizeSkillValue(value) {
  return isValidSkillValue(value) ? value : INVALID_VALUE;
}
