import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { SmartAuctionProvider } from "../context/SmartAuctionContext";

import SmartAuctionContent from "../components/auction/smart/SmartAuctionContent";

import GameConnection from "../components/auction/smart/game/GameConnection";

import ScannerConfiguration from "../components/auction/smart/scanner/ScannerConfiguration";

import ScannerRegion from "../components/auction/smart/scanner/ScannerRegion";

import AuctionAnalyzer from "../components/auction/smart/analysis/SmartAuctionAnalysisManager";

import SmartTarget from "../components/auction/smart/target/SmartTarget";

import AuctionScannerDebugManager from "../components/auction/smart/debug/AuctionScannerDebugManager";

/* ==================================================
   USER NAVIGATION
   ==================================================

   Somente estas três telas fazem parte
   da navegação que o usuário vê.

   TARGET
      ↓
   GAME
      ↓
   AUCTION ANALYZER

   As outras telas continuam existindo
   e funcionando internamente.
*/

const userPages = [
  {
    path: "target",
    label: "SMART TARGET",
  },

  {
    path: "game",
    label: "GAME CONNECTION",
  },

  {
    path: "analyzer",
    label: "AUCTION ANALYZER",
  },
];

/* ==================================================
   SMART AUCTION
================================================== */

function SmartAuctionAnalyzer() {
  return (
    <SmartAuctionProvider>
      <SmartAuctionRoutes />
    </SmartAuctionProvider>
  );
}

/* ==================================================
   ROUTES
================================================== */

function SmartAuctionRoutes() {
  const navigate = useNavigate();

  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();

  /* ==================================================
     USER NAVIGATION INDEX
     ==================================================

     Somente target, game e analyzer participam
     dos botões Previous / Next.
  */

  const currentIndex = userPages.findIndex((page) => page.path === currentPath);

  /*
   * Caso a rota atual seja uma tela interna
   * (configuration, region ou ocr-debug),
   * ela não participa da navegação do usuário.
   */

  const isUserPage = currentIndex !== -1;

  /* ==================================================
     PREVIOUS
  ================================================== */

  function handlePrevious() {
    /*
     * Na primeira tela do Smart Auction,
     * o Previous volta para o Auction Simulator.
     */

    if (currentPath === "target") {
      navigate("/app/auction");

      return;
    }

    /*
     * Se estiver em uma tela interna,
     * não altera a navegação.
     */

    if (!isUserPage) {
      return;
    }

    /*
     * Caso seja a primeira tela do fluxo,
     * não existe página anterior dentro
     * do Smart Auction.
     */

    if (currentIndex <= 0) {
      return;
    }

    const previousPage = userPages[currentIndex - 1];

    navigate(`/app/auction/smart/${previousPage.path}`);
  }

  /* ==================================================
     NEXT
  ================================================== */

  function handleNext() {
    /*
     * Telas internas não participam
     * da navegação principal.
     */

    if (!isUserPage) {
      return;
    }

    /*
     * Se já estiver na última tela,
     * não existe próxima página.
     */

    if (currentIndex >= userPages.length - 1) {
      return;
    }

    const nextPage = userPages[currentIndex + 1];

    navigate(`/app/auction/smart/${nextPage.path}`);
  }

  /* ==================================================
     BUTTON STATE
  ==================================================

     TARGET:
       Previous = volta para Auction Simulator
       Next = Game

     GAME:
       Previous = Target
       Next = Analyzer

     ANALYZER:
       Previous = Game
       Next = disabled

     INTERNAL:
       Previous = disabled
       Next = disabled
  */

  const previousDisabled = false;

  const nextDisabled = !isUserPage || currentIndex === userPages.length - 1;

  return (
    <SmartAuctionContent
      onPrevious={handlePrevious}
      onNext={handleNext}
      previousDisabled={previousDisabled}
      nextDisabled={nextDisabled}
    >
      {/* ==================================================
          GLOBAL SCANNER REGION ENGINE
          ==================================================

          O ScannerRegion continua montado durante
          toda a navegação.

          Isso permite que o croppedFrame seja
          atualizado automaticamente a cada nova
          captura de 4 minutos.

          A interface visual só aparece quando
          a rota atual é "region".
      */}

      <ScannerRegion renderInterface={currentPath === "region"} />

      {/* ==================================================
          GLOBAL OCR ENGINE
          ==================================================

          O OCR continua montado durante toda
          a navegação.

          Ele continua recebendo automaticamente
          cada novo croppedFrame.
      */}

      <AuctionScannerDebugManager />

      {/* ==================================================
          APPLICATION ROUTES
          ==================================================

          Todas as telas continuam existindo.

          Elas simplesmente não fazem mais parte
          da navegação normal do usuário.
      */}

      <Routes>
        {/* ==================================================
            SMART AUCTION ENTRY
            ==================================================

            Ao entrar no Smart Auction sem uma rota
            específica, abrimos diretamente a Tela 5.
        */}

        <Route path="/" element={<Navigate to="target" replace />} />

        {/* ==================================================
            USER FLOW
            ================================================== */}

        <Route path="target" element={<SmartTarget />} />

        <Route path="game" element={<GameConnection />} />

        <Route path="analyzer" element={<AuctionAnalyzer />} />

        {/* ==================================================
            INTERNAL / TECHNICAL ROUTES
            ==================================================

            Continuam disponíveis e funcionando,
            mas não aparecem no fluxo principal
            do usuário.
        */}

        <Route path="configuration" element={<ScannerConfiguration />} />

        <Route path="region" element={<div />} />

        <Route path="ocr-debug" element={<div />} />

        {/* ==================================================
            FALLBACK
            ================================================== */}

        <Route path="*" element={<Navigate to="target" replace />} />
      </Routes>
    </SmartAuctionContent>
  );
}

export default SmartAuctionAnalyzer;
