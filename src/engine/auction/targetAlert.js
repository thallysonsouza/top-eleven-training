/*
 * =========================
 * TARGET ALERT
 * =========================
 *
 * Controla os jogadores que já
 * dispararam um alerta.
 *
 * A ideia é:
 *
 * jogador aparece
 *       ↓
 * MATCH
 *       ↓
 * já alertou?
 *   ┌───┴───┐
 *   NÃO    SIM
 *    ↓       ↓
 *  ALERTA   IGNORA
 *
 * Assim o mesmo jogador não
 * dispara o som repetidamente.
 */

export default function createTargetAlertManager() {
  const alertedPlayers = new Set();

  /*
   * =========================
   * CHECK MATCH
   * =========================
   *
   * Retorna true somente quando
   * o jogador acabou de se tornar
   * um novo MATCH.
   */

  function shouldAlert(player) {
    if (!player) {
      return false;
    }

    if (!player.targetMatch?.matches) {
      return false;
    }

    /*
     * O ID identifica o jogador
     * dentro da rodada atual.
     */

    const playerId = player.id;

    if (playerId === undefined || playerId === null) {
      return false;
    }

    /*
     * Já alertamos esse jogador.
     */

    if (alertedPlayers.has(playerId)) {
      return false;
    }

    /*
     * Primeiro MATCH desse jogador.
     */

    alertedPlayers.add(playerId);

    return true;
  }

  /*
   * =========================
   * RESET
   * =========================
   *
   * Limpa os jogadores já alertados.
   *
   * Isso será importante quando
   * começarmos uma nova rodada
   * do leilão.
   */

  function reset() {
    alertedPlayers.clear();
  }

  /*
   * =========================
   * REMOVE PLAYER
   * =========================
   *
   * Permite remover um jogador
   * da memória.
   *
   * Isso será útil no futuro quando
   * o OCR detectar que o jogador
   * saiu do leilão.
   */

  function forgetPlayer(playerId) {
    if (playerId === undefined || playerId === null) {
      return;
    }

    alertedPlayers.delete(playerId);
  }

  /*
   * =========================
   * STATUS
   * =========================
   */

  function hasAlerted(playerId) {
    return alertedPlayers.has(playerId);
  }

  return {
    shouldAlert,
    reset,
    forgetPlayer,
    hasAlerted,
  };
}
